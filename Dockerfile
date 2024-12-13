FROM oven/bun:1.1 AS base

WORKDIR /usr/src/app

FROM base AS build

ENV NODE_ENV=production

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN bun install
RUN bun run generate

FROM nginx:alpine AS app

COPY --from=build /usr/src/app/.output/public /usr/share/nginx/html

EXPOSE 80
