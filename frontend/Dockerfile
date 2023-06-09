# syntax=docker/dockerfile:1

FROM node:lts-bullseye-slim

WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]