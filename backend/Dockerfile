FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY server.mjs ./

ENV NODE_ENV=production
ENV PORT=4000
ENV DATA_DIR=/data

VOLUME ["/data"]

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4000/api/health || exit 1

CMD ["node", "server.mjs"]
