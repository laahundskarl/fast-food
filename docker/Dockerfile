# syntax=docker/dockerfile:1

# Etapa de build (para possíveis assets ou transpilações futuras)
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Etapa final de produção
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app ./

CMD ["npm", "run", "start:prod"]