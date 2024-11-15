FROM node:20-alpine as builder

RUN apt-get update && apt-get install -y -q --no-install-recommends libfontconfig1

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "start:prod"]