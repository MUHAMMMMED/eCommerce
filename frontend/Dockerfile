# # Use the official Node image
# FROM node:alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json /app/

# # Clean npm cache before installing dependencies
# RUN npm cache clean --force && npm install

# # RUN npm install

# # Copy the project files
# COPY . /app/

# ENV NODE_OPTIONS=--max_old_space_size=10096
# # Build the React app
# RUN npm run build

# # Serve the React app
# CMD ["npx", "serve", "-s", "build", "-l", "3000"]

# Use a larger Node image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache before installing dependencies
RUN npm cache clean --force && npm install

# Copy the project files
COPY . .

# Increase memory allocation (adjust as needed)
ENV NODE_OPTIONS=--max_old_space_size=8192

# Build the React app
RUN npm run build

# Serve the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]