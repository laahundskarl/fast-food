# syntax=docker/dockerfile:1

# Etapa de build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# Etapa final de produção
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=build /app/src/database/prisma /app/src/database/prisma

COPY --from=build /app/dist ./dist
COPY tsconfig.json ./

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

ENV NODE_PATH=./dist

CMD ["sh", "-c", "/wait-for.sh $DATABASE_HOST:$DATABASE_PORT -- npx prisma migrate deploy && npm run prisma:seed && node dist/index.js"]
