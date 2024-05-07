# Use Node.js image to build the Next.js application
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if any) to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install


# Copy the entire source code to the working directory
COPY . .

RUN npm run build
# Expose port 80 of the container
EXPOSE 3000

# Run Nginx when the container starts
CMD ["npm", "run" ,"start"]
