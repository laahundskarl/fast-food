# syntax=docker/dockerfile:1

# Etapa de build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .
RUN npm run typeorm migration:run -- -d src/database/typeorm.config.ts
RUN npm run build

# Etapa final de produção
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY tsconfig.json ./
ENV NODE_PATH=./dist

CMD ["node", "dist/index.js"]