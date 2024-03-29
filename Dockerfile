# Dockerfile configurations for app

# It consists of four image configurations:
# 1. Dependencies
# 2. Builder
# 3. Production Builder
# 4. Runner

# Dependencies Image:

# Install dependencies only when needed
FROM node:alpine AS dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the package.json and yarn.lock files so
# that the installation is only recomputed if any of
# the dependency files change
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ----------------------------------------------------

# Builder Image:

# Build or rebuild application only when needed
FROM node:alpine AS builder

WORKDIR /app

# Copy the source code and the dependencies from the dependencies image
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

# Build the application
RUN yarn generate
RUN yarn build

# ----------------------------------------------------

# Production Builder Image:

# Builds the app in production mode
FROM node:alpine AS production-builder

WORKDIR /app

# Remove all the development dependencies and copy the prisma folder to
# generate the prisma client inside of the node_modules
RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY prisma prisma
RUN yarn generate
RUN cp -R node_modules production_node_modules

# ----------------------------------------------

# Runner Image

# Runs the application in a production environment
FROM node:alpine AS runner

WORKDIR /app
ENV NODE_ENV production

# Create the user and its group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build files from the builder image
COPY --from=production-builder --chown=nextjs:nodejs /app/production_node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.env ./
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Set user to nextjs in order to run the commands
USER nextjs

EXPOSE 3000

CMD ["yarn", "deploy"]