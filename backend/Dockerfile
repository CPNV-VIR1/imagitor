# syntax=docker/dockerfile:1

FROM node:lts-bullseye-slim

WORKDIR /app

COPY ["../package.json", "../package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "serve"]