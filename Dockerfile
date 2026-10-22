# Use the official Node.js runtime as the base image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Use non-root user provided by the Node image for security
USER node

# Expose application port
EXPOSE 3000

# Start the application directly with Node for proper signal handling
CMD ["node", "app.js"]
