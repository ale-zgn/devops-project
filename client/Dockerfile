# Stage 1 - Build React app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:alpine

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (proxy /api to backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf  

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
