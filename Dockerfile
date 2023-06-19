# production stage
FROM nginx:stable-alpine as production-stage
# COPY /dist /usr/share/nginx/html
COPY /dist /
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]