# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY /dist /usr/share/nginx/html
# # COPY /dist /
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM socialengine/nginx-spa:latest
# COPY /dist /app
# RUN chmod -R 777 /app

FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Use nginx as the final base image
FROM socialengine/nginx-spa:latest

COPY --from=builder /app/dist /app

RUN chmod -R 777 /app

