# syntax=docker/dockerfile:1
FROM nginx:alpine
LABEL author="Marietta Ngwe" 
COPY /dist /usr/share/nginx/html/
EXPOSE 443 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]