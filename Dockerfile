FROM node:18 as build

WORKDIR /app
COPY . /app

RUN rm -rf node_modules
# RUN npm install -g pnpm
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]