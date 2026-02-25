#!/bin/bash

set -e

load_entrypoint_postgre(){
    echo "Cargando entrypoint PostgreSQL..." >> /root/logs/informe_web.log
    
    if [ -f /root/admin/postgre/jhlwstart.sh ]; then
        bash /root/admin/postgre/jhlwstart.sh
        echo "Entrypoint PostgreSQL ejecutado" >> /root/logs/informe_web.log
    else
        echo "ADVERTENCIA: jhlwstart.sh de PostgreSQL no encontrado" >> /root/logs/informe_web.log
    fi
}

load_entrypoint_nginx(){
    echo "Cargando entrypoint Nginx..." >> /root/logs/informe_web.log
    
    if [ -f /root/admin/sweb/nginx/jhlwstart.sh ]; then
        bash /root/admin/sweb/nginx/jhlwstart.sh
        echo "Entrypoint Nginx ejecutado" >> /root/logs/informe_web.log
    else
        echo "ADVERTENCIA: jhlwstart.sh de Nginx no encontrado" >> /root/logs/informe_web.log
    fi
}

directorio_de_trabajo(){
    echo "Cambiando directorio al proyecto NestJS..." >> /root/logs/informe_web.log

    if cd /root/admin/node/proyectos/nestpostgresql; then
        echo "Directorio cambiado a: $(pwd)" >> /root/logs/informe_web.log
    else
        echo "ERROR: No se pudo cambiar al directorio del proyecto NestJS" >> /root/logs/informe_web.log
        exit 1
    fi
}

construir_y_arrancar(){
    echo "Instalando dependencias NestJS..." >> /root/logs/informe_web.log
    
    npm install
    
    # Construir proyecto NestJS (TypeScript -> JavaScript)
    if npm run build; then
        echo "Proyecto NestJS construido" >> /root/logs/informe_web.log
    else
        echo "ERROR: Falló npm run build" >> /root/logs/informe_web.log
        exit 1
    fi
    
    # Copiar archivos estáticos (public) a nginx
    if [ -d public ]; then
        cp -r public/* /var/www/html/
        echo "Archivos estáticos copiados a /var/www/html" >> /root/logs/informe_web.log
    else
        echo "ADVERTENCIA: Directorio public no encontrado" >> /root/logs/informe_web.log
    fi
    
    # Arrancar NestJS en segundo plano
    echo "Arrancando NestJS en segundo plano..." >> /root/logs/informe_web.log
    HOST=0.0.0.0 npm run start:prod &
}

cargar_nginx(){
    echo "Configurando Nginx..." >> /root/logs/informe_web.log
    
    # Verificar configuración de Nginx
    nginx -t
    # Iniciar Nginx en primer plano (mantiene el contenedor vivo)
    echo "Nginx arrancando en primer plano..." >> /root/logs/informe_web.log
    nginx -g 'daemon off;'
}

main(){
    mkdir -p /root/logs
    touch /root/logs/informe_web.log
    load_entrypoint_postgre
    load_entrypoint_nginx
    directorio_de_trabajo
    construir_y_arrancar
    cargar_nginx
}

main