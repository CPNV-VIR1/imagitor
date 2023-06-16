# syntax=docker/dockerfile:1

FROM node:lts-bullseye-slim as build

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:stable-alpine as production

COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/languages /usr/share/nginx/html/languages

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]