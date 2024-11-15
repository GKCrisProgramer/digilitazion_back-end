FROM node:20-alpine

RUN apk add --no-cache fontconfig

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "start:prod"]