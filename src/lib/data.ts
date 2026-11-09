import protocolData from "../../data/protocol.json";
import pricingData from "../../data/pricing.json";
import citiesData from "../../data/cities.json";
import industriesData from "../../data/industries.json";
import servicesData from "../../data/services.json";
import siteData from "../../data/site.json";

export type ProtocolPoint = {
  number: string;
  id: number;
  title: string;
  standard: string;
  photoVerified: boolean;
  criticalFor: string[];
};

export type ProtocolZone = {
  id: string;
  label: string;
  code: string;
  pointRange: string;
  summary: string;
  points: ProtocolPoint[];
};

export type CityRecord = (typeof citiesData)[number];
export type IndustryRecord = (typeof industriesData)[number];
export type ResidentialServiceRecord = (typeof servicesData.residentialServices)[number];
export type AddOnRecord = (typeof servicesData.addOns)[number];
export type CostGuideRecord = (typeof servicesData.costGuides)[number];

export const protocol = protocolData as {
  protocolName: string;
  version: string;
  verificationMethod: string;
  zones: ProtocolZone[];
};

export const pricingConfig = pricingData;
export const cities = citiesData;
export const industries = industriesData;
export const residentialServices = servicesData.residentialServices;
export const addOns = servicesData.addOns;
export const costGuides = servicesData.costGuides;
export const site = siteData;

export function getAllProtocolPoints(): ProtocolPoint[] {
  return protocol.zones.flatMap((z) => z.points);
}

export function getProtocolPointsByIds(ids: number[]): ProtocolPoint[] {
  const all = getAllProtocolPoints();
  return ids.map((id) => all.find((p) => p.id === id)).filter((p): p is ProtocolPoint => Boolean(p));
}

export function getCityBySlug(slug: string): CityRecord | undefined {
  const normalized = slug.replace(/-ca$/, "");
  return cities.find((c) => c.slug === normalized);
}

export function getIndustryBySlug(slug: string): IndustryRecord | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getTier1Cities(): CityRecord[] {
  return cities.filter((c) => c.tier === 1);
}

export function getTier1Industries(): IndustryRecord[] {
  return industries.filter((i) => i.isTier1Combo);
}

export type CommercialFacilityKey = keyof typeof pricingData.commercial.productionRateSqftPerHour;
export type FloorMixKey = keyof typeof pricingData.commercial.floorMixFactor;
export type TimeOfDayKey = keyof typeof pricingData.commercial.timeOfDayMultiplier;

export interface CommercialCalcInput {
  zip: string;
  facilityType: CommercialFacilityKey;
  sqft: number;
  restrooms: number;
  floors: FloorMixKey;
  visitsPerWeek: number;
  timeOfDay: TimeOfDayKey;
  addOns: {
    supplies: boolean;
    floorCare: boolean;
    windows: boolean;
    dayPorterHoursPerWeek: number;
    carpet: boolean;
    grounds: boolean;
  };
}

export interface CommercialCalcResult {
  isCustomProgram: boolean;
  customReason?: string;
  hoursPerVisit: number;
  baseMonthly: number;
  addOnsMonthlyTotal: number;
  addOnLineItems: { label: string; amount: number }[];
  rawMonthly: number;
  lowMonthly: number;
  highMonthly: number;
  perVisitLow: number;
  perVisitHigh: number;
  recommendedTier: "Essential" | "Classic Standard" | "Inspection-Ready";
  zipServed: boolean;
  cityMatched?: string;
}

function roundToNearest(val: number, step: number): number {
  return Math.round(val / step) * step;
}

export function calculateCommercialPrice(input: CommercialCalcInput): CommercialCalcResult {
  const cfg = pricingConfig.commercial;
  const cleanZip = input.zip.trim();
  const zipServed = cleanZip.length === 5 ? pricingConfig.serviceZips.includes(cleanZip) : true;
  const cityMatched = (pricingConfig.zipToCity as Record<string, string>)[cleanZip];

  const prodRate = cfg.productionRateSqftPerHour[input.facilityType] || 3000;
  const floorFactor = cfg.floorMixFactor[input.floors] || 1.0;
  const effectiveProdRate = prodRate * floorFactor;

  const hoursPerVisit =
    input.sqft / effectiveProdRate + (input.restrooms * cfg.minutesPerRestroom) / 60;

  const timeMult = cfg.timeOfDayMultiplier[input.timeOfDay] || 1.0;
  const visitsPerMonth = input.visitsPerWeek * cfg.weeksPerMonth;

  const baseMonthly = hoursPerVisit * cfg.billableRate * visitsPerMonth * timeMult;

  const addOnLineItems: { label: string; amount: number }[] = [];
  if (input.addOns.supplies) {
    const amt = Math.round(cfg.addOnsMonthly.suppliesPerVisit * visitsPerMonth);
    addOnLineItems.push({ label: "Restroom & breakroom consumables restock", amount: amt });
  }
  if (input.addOns.floorCare) {
    addOnLineItems.push({ label: "Monthly hard-floor machine scrub / burnish", amount: cfg.addOnsMonthly.floorCare });
  }
  if (input.addOns.windows) {
    addOnLineItems.push({
      label: "Interior/exterior glass quarterly program (amortized)",
      amount: cfg.addOnsMonthly.windowsQuarterlyAmortized,
    });
  }
  if (input.addOns.carpet) {
    addOnLineItems.push({
      label: "Quarterly traffic-lane carpet extraction (amortized)",
      amount: cfg.addOnsMonthly.carpetQuarterlyAmortized,
    });
  }
  if (input.addOns.grounds) {
    addOnLineItems.push({ label: "Exterior entry & grounds tidy patrol", amount: cfg.addOnsMonthly.grounds });
  }
  if (input.addOns.dayPorterHoursPerWeek > 0) {
    const amt = Math.round(
      input.addOns.dayPorterHoursPerWeek * cfg.addOnsMonthly.dayPorterHour * cfg.weeksPerMonth
    );
    addOnLineItems.push({
      label: `Day porter (${input.addOns.dayPorterHoursPerWeek} hrs/wk)`,
      amount: amt,
    });
  }

  const addOnsMonthlyTotal = addOnLineItems.reduce((sum, item) => sum + item.amount, 0);
  const rawMonthly = Math.max(cfg.monthlyMinimum, baseMonthly + addOnsMonthlyTotal);

  const lowMonthly = roundToNearest(rawMonthly * cfg.rangeLow, cfg.roundTo);
  const highMonthly = roundToNearest(rawMonthly * cfg.rangeHigh, cfg.roundTo);

  const perVisitLow = Math.round(lowMonthly / visitsPerMonth);
  const perVisitHigh = Math.round(highMonthly / visitsPerMonth);

  let recommendedTier: "Essential" | "Classic Standard" | "Inspection-Ready" = "Classic Standard";
  if (cfg.tierThresholds.inspectionReadyTypes.includes(input.facilityType) || input.visitsPerWeek >= 5) {
    recommendedTier = "Inspection-Ready";
  } else if (input.visitsPerWeek <= cfg.tierThresholds.essentialMaxVisits && input.sqft <= 3500) {
    recommendedTier = "Essential";
  }

  const isCustomProgram =
    input.sqft > cfg.customAboveSqft || input.visitsPerWeek > cfg.customAboveVisits;

  return {
    isCustomProgram,
    customReason:
      input.sqft > cfg.customAboveSqft
        ? `Facilities above ${cfg.customAboveSqft.toLocaleString()} sq ft receive a custom multi-tech staffing matrix.`
        : input.visitsPerWeek > cfg.customAboveVisits
        ? "7-day continuous operations receive a dedicated site staffing plan."
        : undefined,
    hoursPerVisit: Number(hoursPerVisit.toFixed(2)),
    baseMonthly: Math.round(baseMonthly),
    addOnsMonthlyTotal,
    addOnLineItems,
    rawMonthly: Math.round(rawMonthly),
    lowMonthly,
    highMonthly,
    perVisitLow,
    perVisitHigh,
    recommendedTier,
    zipServed,
    cityMatched,
  };
}

export type ResidentialServiceKey = keyof typeof pricingData.residential.serviceMultiplier;
export type SqftBandKey = keyof typeof pricingData.residential.sqftAdjust;
export type FrequencyKey = keyof typeof pricingData.residential.frequencyDiscount;
export type ConditionKey = keyof typeof pricingData.residential.conditionMultiplier;
export type ResidentialAddOnKey = keyof typeof pricingData.residential.addOns;

export interface ResidentialCalcInput {
  zip: string;
  serviceType: ResidentialServiceKey;
  bedrooms: number;
  bathrooms: number;
  halfBaths: number;
  sqftBand: SqftBandKey;
  frequency: FrequencyKey;
  condition: ConditionKey;
  pets: boolean;
  addOns: ResidentialAddOnKey[];
}

export interface ResidentialCalcResult {
  baseRoomTotal: number;
  serviceMultiplier: number;
  conditionMultiplier: number;
  frequencyDiscountPct: number;
  frequencySavingsAmount: number;
  petSurcharge: number;
  addOnLineItems: { key: ResidentialAddOnKey; label: string; price: number }[];
  addOnsTotal: number;
  rawVisitPrice: number;
  lowVisitPrice: number;
  highVisitPrice: number;
  zipServed: boolean;
  cityMatched?: string;
}

export function calculateResidentialPrice(input: ResidentialCalcInput): ResidentialCalcResult {
  const cfg = pricingConfig.residential;
  const cleanZip = input.zip.trim();
  const zipServed = cleanZip.length === 5 ? pricingConfig.serviceZips.includes(cleanZip) : true;
  const cityMatched = (pricingConfig.zipToCity as Record<string, string>)[cleanZip];

  const sqftAdj = cfg.sqftAdjust[input.sqftBand] || 0;
  const baseRoomTotal =
    cfg.base +
    input.bedrooms * cfg.perBedroom +
    input.bathrooms * cfg.perBathroom +
    input.halfBaths * cfg.perHalfBath +
    sqftAdj;

  const serviceMultiplier = cfg.serviceMultiplier[input.serviceType] || 1.0;
  const conditionMultiplier = cfg.conditionMultiplier[input.condition] || 1.0;
  const discountRate = cfg.frequencyDiscount[input.frequency] || 0;

  const preDiscount = baseRoomTotal * serviceMultiplier * conditionMultiplier;
  const frequencySavingsAmount = Math.round(preDiscount * discountRate);
  const discountedSubtotal = preDiscount * (1 - discountRate);

  const petSurcharge = input.pets ? cfg.petSurcharge : 0;
  const addOnLineItems = input.addOns.map((k) => ({
    key: k,
    label: cfg.addOns[k].label,
    price: cfg.addOns[k].price,
  }));
  const addOnsTotal = addOnLineItems.reduce((sum, item) => sum + item.price, 0);

  const rawVisitPrice = Math.max(
    cfg.minimumVisit,
    discountedSubtotal + petSurcharge + addOnsTotal
  );

  const lowVisitPrice = roundToNearest(rawVisitPrice * cfg.rangeLow, cfg.roundTo);
  const highVisitPrice = roundToNearest(rawVisitPrice * cfg.rangeHigh, cfg.roundTo);

  return {
    baseRoomTotal,
    serviceMultiplier,
    conditionMultiplier,
    frequencyDiscountPct: Math.round(discountRate * 100),
    frequencySavingsAmount,
    petSurcharge,
    addOnLineItems,
    addOnsTotal,
    rawVisitPrice: Math.round(rawVisitPrice),
    lowVisitPrice,
    highVisitPrice,
    zipServed,
    cityMatched,
  };
}

