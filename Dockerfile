# Dockerfile for Unified React + Node App

# Stage 1: Build the React Application
FROM node:18 AS build
WORKDIR /app

# Copy dependencies first for caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the frontend (Vite)
RUN npm run build
# This generates the 'dist' folder

# Stage 2: Setup Production Server
FROM node:18-slim
WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy backend code (server.js, etc)
COPY server.js ./
COPY .env ./ 
# Note: You might want to handle .env differently in production (e.g. env vars in AWS)

# Copy built frontend assets from builder stage
COPY --from=build /app/dist ./dist

# Expose the correct port
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
