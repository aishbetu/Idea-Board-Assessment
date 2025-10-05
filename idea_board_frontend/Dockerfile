# Multi-stage Dockerfile for a Next.js (v15) application
#  - builder stage installs deps and builds the app
#  - runner stage copies the built app and runs `next start`

### Notes
# - The image uses Node 20 (alpine). If you need a different Node version change the tags.
# - The Dockerfile falls back to `npm install` when no lockfile is present.

FROM node:20-alpine AS deps
WORKDIR /app

# Copy package manifests first for caching
COPY package.json package-lock.json* ./

# Install dependencies (use npm ci when lockfile exists, otherwise npm install)
RUN if [ -f package-lock.json ]; then \
      npm ci --unsafe-perm --silent; \
    else \
      npm install --silent; \
    fi

FROM node:20-alpine AS builder
WORKDIR /app

# Copy installed node_modules from deps stage to speed up build
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the project files
COPY . .

# Build the Next.js app (uses script from package.json)
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built app and node_modules from builder
COPY --from=builder /app .

# Expose default Next.js port
EXPOSE 3000

# Use the package.json start script which runs `next start`
CMD ["npm", "run", "start"]
