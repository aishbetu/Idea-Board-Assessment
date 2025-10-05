# Multi-stage Dockerfile for idea_board_backend
# Builder stage: install deps (including dev), generate Prisma client, build TypeScript
# Final stage: copy only production artifacts and node_modules (pruned)

FROM node:20-slim AS builder

# set working directory
WORKDIR /app

# Install minimal tools (kept small) for npm and Prisma install scripts
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  git \
  && rm -rf /var/lib/apt/lists/*

# copy package manifests first for better cache
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# install all dependencies (including devDependencies required to build)
RUN npm ci --ignore-scripts

# copy source
COPY . .

# run prisma generate (generates client for target platform) and build
RUN npm run prisma:generate && npm run build

# remove devDependencies to keep final image small
RUN npm prune --production


FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# copy production node_modules and build output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# default port (can be overridden by passing PORT env var)
EXPOSE 8000
ENV PORT=8000

# recommend running with a DATABASE_URL env var for Prisma
CMD ["node", "dist/server.js"]
