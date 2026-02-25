# =============================================
# Stage 1: Build - Compilar el proyecto NestJS
# =============================================
FROM node:22-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias primero (aprovechar cache de Docker)
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# Copiar todo el código fuente del proyecto
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# =============================================
# Stage 2: Production - Imagen final ligera
# =============================================
FROM node:22-alpine AS production

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./

# Copiar el script de entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Crear directorio de logs
RUN mkdir -p /root/logs

# Puerto que expone la app NestJS
EXPOSE 3001

# Ejecutar el entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
