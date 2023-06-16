# syntax=docker/dockerfile:1

FROM node:lts-bullseye-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm install
RUN apt-get update && apt-get install -y \
    fontconfig \
    fonts-dejavu \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 5000

CMD ["npm", "run", "serve"]