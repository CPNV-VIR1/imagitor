# syntax=docker/dockerfile:1

FROM node:lts-bullseye-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm install --include=dev

COPY . .

EXPOSE 5000

CMD ["npm", "run", "serve"]