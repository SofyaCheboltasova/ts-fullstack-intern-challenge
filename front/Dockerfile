FROM node AS vite-app

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html && mkdir /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=vite-app /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
