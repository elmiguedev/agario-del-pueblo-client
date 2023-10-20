FROM node:18-alpine as build

WORKDIR /app
COPY . /app

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build


CMD ["pnpm","serve"]