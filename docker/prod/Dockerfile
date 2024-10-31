# Step 1: Build the Next.js application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies inside the container
RUN yarn install

# Copy the rest of your application code into the container
COPY . .

# Build the application inside the container
RUN yarn build

# Step 2: Prepare the production image
FROM node:18 AS runner

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Install only production dependencies
RUN yarn install --production

# Expose the port the app runs on
EXPOSE 3000

# Command to start the Next.js server
CMD ["yarn", "start"]
