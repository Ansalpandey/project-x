# ----------- Builder stage -----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all app files
COPY . .

# ----------- Runtime stage -----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy everything needed from builder
COPY --from=builder /app ./

ENTRYPOINT ["node", "index.js"]
