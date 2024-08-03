ARG NODE_IMAGE=node:20.14.0-alpine

FROM $NODE_IMAGE AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk --no-cache add dumb-init
WORKDIR /home/node/app
RUN mkdir tmp

FROM base AS dependencies
COPY ./package.json .
COPY ./pnpm-lock.yaml .

COPY . .

FROM dependencies AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0
COPY ./package.json .
COPY ./pnpm-lock.yaml .

#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod
COPY --from=build /home/node/app/build .
COPY --from=build /home/node/app/node_modules ./node_modules
EXPOSE 80
CMD ["dumb-init", "node", "bin/server.js"]


