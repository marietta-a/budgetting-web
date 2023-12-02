# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY package*.json  /app/
RUN npm install -g npm@10.2.4
RUN npm install -g @angular/cli@latest
COPY . .
EXPOSE 4200
CMD ng serve --host 0.0.0.0 