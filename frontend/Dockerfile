# Step 1: Build frontend
FROM node:18-alpine as build-step

# Set working directory
WORKDIR /usr/app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy and install application
COPY src src
COPY public public
ENV REACT_APP_BACKEND_URL="https://backend.1f106c1j1agn.eu-gb.codeengine.appdomain.cloud"
RUN npm run build

# Step 2: Production image
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from previous stage
COPY --from=build-step /usr/app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
