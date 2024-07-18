FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY src/ .

# Expose port and start the application
EXPOSE 3002
CMD ["node", "index.js"]
