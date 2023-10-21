# FROM nginx:latest

# # Copiar los archivos compilados de la aplicación a NGINX
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Configurar el archivo de configuración de NGINX
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Exponer el puerto 80
# EXPOSE 80

# # Iniciar NGINX
# CMD ["nginx", "-g", "daemon off;"]

FROM socialengine/nginx-spa:latest
COPY ./dist /app
RUN chmod -R 777 /app