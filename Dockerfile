FROM node:20-alpine as builder

RUN apk add --no-cache libfontconfig1

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "start:prod"]