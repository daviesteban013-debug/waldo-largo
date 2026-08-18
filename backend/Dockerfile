# ──────────────────────────────────────
# Stage 1: Install dependencies
# ──────────────────────────────────────
FROM node:20-slim AS deps

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev
RUN npx prisma generate

# ──────────────────────────────────────
# Stage 2: Build TypeScript
# ──────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY src ./src/
RUN npm run build

# ──────────────────────────────────────
# Stage 3: Production image
# ──────────────────────────────────────
FROM node:20-slim AS runner

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production

# Copy production node_modules (with Prisma client)
COPY --from=deps /app/node_modules ./node_modules/
COPY --from=deps /app/package.json ./

# Copy compiled JS
COPY --from=builder /app/dist ./dist/

# Copy Prisma schema + migrations for deploy
COPY prisma ./prisma/

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser
USER appuser

EXPOSE 4000

# Run migrations then start
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
