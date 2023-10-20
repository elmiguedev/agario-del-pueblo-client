FROM socialengine/nginx-spa:latest
COPY ./dist /app
RUN chmod -R 777 /app