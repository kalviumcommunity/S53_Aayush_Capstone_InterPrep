# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or package*.json) to the container's working directory
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the application code to the container's working directory
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the application using the compiled index.js file in the dist folder
CMD ["node", "dist/index.js"]