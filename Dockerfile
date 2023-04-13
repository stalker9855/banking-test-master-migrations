# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /src
WORKDIR /clem/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application listens on
EXPOSE 7000

# Start the application
CMD ["node", "dist/main"]
