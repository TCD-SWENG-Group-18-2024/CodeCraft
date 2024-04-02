# Step 1: Build frontend
FROM node:18-alpine as build-step

#   Set working directory
WORKDIR /usr/app

#   Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

#   Copy and install application
COPY src src
COPY public public
RUN npm run build

# Step 2: Production image
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

#   Copy built files from previous stage
COPY --from=build-step /usr/app/build /usr/share/nginx/html

#   Start NGINX server
CMD ["nginx", "-g", "daemon off;"]