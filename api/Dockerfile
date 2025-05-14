# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the API code
COPY . .

# Expose the port the API runs on
EXPOSE 5000

# Command to run the API
CMD ["npm", "start"]