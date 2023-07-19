# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY /dist /usr/share/nginx/html
# # COPY /dist /
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM socialengine/nginx-spa:latest
# COPY /dist /app
# RUN chmod -R 777 /app

FROM socialengine/nginx-spa:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Build the app
RUN npm run build

# Copy the built files to the working directory
COPY dist/ .

# Set appropriate permissions
RUN chmod -R 777 /app
