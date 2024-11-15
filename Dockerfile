FROM node:20-alpine AS builder

RUN apk add --no-cache fontconfig

WORKDIR /app
COPY ./package.json ./
RUN yarn install

COPY . ./
RUN yarn build

FROM alpine:3.18

RUN apk add --no-cache nginx nodejs yarn

COPY --from=builder /app/config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app /app

WORKDIR /app
EXPOSE 3000

CMD ["sh", "-c", "node dist/main.js & nginx -g 'daemon off;'"]
