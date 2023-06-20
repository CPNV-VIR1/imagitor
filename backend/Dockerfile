# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --update python3 make g++ pkgconfig pixman-dev cairo-dev jpeg-dev pango-dev giflib-dev
RUN apk add --update fontconfig ttf-dejavu

RUN npm install
COPY . .
CMD ["node", "server.js"]