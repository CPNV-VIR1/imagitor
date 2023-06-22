# syntax=docker/dockerfile:1

FROM node:18-alpine as build
ENV VITE_API_URL http://imagitor.cld.education
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/languages /usr/share/nginx/html/languages

CMD ["nginx", "-g", "daemon off;"]