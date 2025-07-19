
# Stage 1: Build the React frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy frontend package.json and install dependencies
COPY antd-demo/package.json antd-demo/package-lock.json ./antd-demo/
RUN cd antd-demo && npm install

# Copy the rest of the frontend source code
COPY antd-demo/ ./antd-demo/

# Build the frontend
RUN cd antd-demo && npm run build

# Stage 2: Setup the final production image
FROM node:18-alpine

WORKDIR /app

# Install dependencies for the backend server
COPY package.json package-lock.json ./
RUN npm install --production

# Copy backend server code and shell scripts
COPY server.js ./
COPY CreateLoadBalancer.sh DescribeSubnets.sh DescribeVpcs.sh ./

# Copy the built frontend from the build stage
COPY --from=build /app/antd-demo/build ./antd-demo/build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
# The server will default to 3001, but can be overridden by the PORT env var
CMD [ "node", "server.js" ]
