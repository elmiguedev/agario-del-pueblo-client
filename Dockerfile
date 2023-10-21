# Etapa de compilación
FROM node:18 AS builder

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar los archivos de la aplicación
COPY package.json .
COPY pnpm-lock.yaml .

# Instalar las dependencias
RUN pnpm install

# Copiar el código fuente de la aplicación
COPY . .

# Compilar la aplicación
RUN pnpm build

# Etapa de producción
FROM nginx:latest

# Copiar los archivos compilados de la aplicación a NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar el archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]