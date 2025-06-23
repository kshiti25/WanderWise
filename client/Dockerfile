# Step 1: Build the React app
FROM node:18 as build
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install react-to-print

COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine AS stage-1

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
