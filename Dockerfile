FROM catatnight/nginx-nodejs

WORKDIR /app
COPY . /app

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

COPY /app/dist /var/www/html/
EXPOSE 80

CMD ["nginx","-g","daemon off;"]