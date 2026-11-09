import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const baseProps = (size: number, props: React.SVGProps<SVGSVGElement>): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  ...props,
});

export function IconClipboard({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="4" y="4" width="16" height="18" />
      <path d="M9 2H15V6H9V2Z" />
      <path d="M8 11L10.5 13.5L16 8.5" />
      <path d="M8 17H16" />
    </svg>
  );
}

export function IconCheckSquare({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M7.5 12.2L10.5 15.2L16.8 8.8" className="animate-check-draw" />
    </svg>
  );
}

export function IconOfficeBuilding({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="4" y="3" width="16" height="18" />
      <path d="M8 7H10M14 7H16M8 11H10M14 11H16M8 15H10M14 15H16" />
      <path d="M10 21V18H14V21" />
    </svg>
  );
}

export function IconMedicalCross({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M12 7V17M7 12H17" />
    </svg>
  );
}

export function IconChildcare({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="3" y="10" width="8" height="8" />
      <rect x="13" y="10" width="8" height="8" />
      <rect x="8" y="4" width="8" height="6" />
      <path d="M7 14H7.01M17 14H17.01M12 7H12.01" />
    </svg>
  );
}

export function IconRetailStore({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M3 9L5 4H19L21 9" />
      <rect x="4" y="9" width="16" height="12" />
      <path d="M9 21V14H15V21" />
    </svg>
  );
}

export function IconGymBarbell({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M2 12H22" />
      <rect x="4" y="7" width="3" height="10" />
      <rect x="17" y="7" width="3" height="10" />
      <path d="M1 9V15M23 9V15" />
    </svg>
  );
}

export function IconSanctuary({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M12 2V6M10 4H14" />
      <path d="M4 11L12 6L20 11V21H4V11Z" />
      <path d="M10 21V15H14V21" />
    </svg>
  );
}

export function IconWarehouse({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M2 9L12 4L22 9V20H2V9Z" />
      <rect x="6" y="12" width="12" height="8" />
      <path d="M6 15H18M6 18H18" />
    </svg>
  );
}

export function IconPropertyKeys({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="3" y="6" width="10" height="15" />
      <rect x="13" y="10" width="8" height="11" />
      <path d="M6 10H10M6 14H10M16 14H18" />
    </svg>
  );
}

export function IconHouse({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M3 10.5L12 3L21 10.5V20H3V10.5Z" />
      <path d="M9.5 20V13.5H14.5V20" />
    </svg>
  );
}

export function IconPhone({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M5 4H9L11 9L8.5 10.5C9.7 13 11 14.3 13.5 15.5L15 13L20 15V19C20 20.1 19.1 21 18 21C9.7 21 3 14.3 3 6C3 4.9 3.9 4 5 4Z" />
    </svg>
  );
}

export function IconSms({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M3 4H21V16H8L3 20V4Z" />
      <path d="M7 9H17M7 12H13" />
    </svg>
  );
}

export function IconCalculator({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <rect x="4" y="2" width="16" height="20" />
      <rect x="7" y="5" width="10" height="4" />
      <path d="M8 13H9M11.5 13H12.5M15 13H16M8 17H9M11.5 17H12.5M15 17H16" />
    </svg>
  );
}

export function IconCameraVerify({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M3 7H7L9 4H15L17 7H21V19H3V7Z" />
      <rect x="9" y="10" width="6" height="6" />
    </svg>
  );
}

export function IconShieldSeal({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M12 2L4 5V11C4 16.2 7.4 20.8 12 22C16.6 20.8 20 16.2 20 11V5L12 2Z" />
      <path d="M8.5 12L11 14.5L15.5 9.5" />
    </svg>
  );
}

export function IconLocationPin({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M12 2C8.1 2 5 5.1 5 9C5 14.2 12 22 12 22C12 22 19 14.2 19 9C19 5.1 15.9 2 12 2Z" />
      <rect x="10" y="7" width="4" height="4" />
    </svg>
  );
}

export function IconFlagIssue({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M5 3V21" />
      <path d="M5 4H19L16 8.5L19 13H5" />
    </svg>
  );
}

export function IconDownloadPdf({ size = 24, ...props }: IconProps) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M12 3V15M12 15L8 11M12 15L16 11" />
      <path d="M4 17V20H20V17" />
    </svg>
  );
}

