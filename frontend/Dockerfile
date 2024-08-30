

# Use a specific Node version image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache before installing dependencies and install
RUN npm cache clean --force && npm install

# Copy the rest of the project files
COPY . .


# Increase memory allocation (adjust as needed)
ENV NODE_OPTIONS=--max_old_space_size=8192

# Build the React app
RUN npm run build

# Install a static server to serve the React app
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the server
CMD ["serve", "-s", "build", "-l", "3000"]


