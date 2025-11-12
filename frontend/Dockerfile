# Stage 1: build Angular
FROM node:22 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
