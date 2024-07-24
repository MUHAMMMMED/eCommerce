# Use the official Node image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the project files
COPY . /app/

# Build the React app
RUN npm run build

# Serve the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
