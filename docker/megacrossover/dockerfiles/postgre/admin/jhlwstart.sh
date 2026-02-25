#!/bin/bash
set -e

LOG_DIR="/root/logs"
LOG_FILE="$LOG_DIR/informe_postgre.log"

# =============================================
# Valores de configuración de PostgreSQL
# =============================================
PG_USER="postgres"
PG_PASSWORD="usuario"
PG_DATABASE="nestasir"
PG_PORT="5432"

# =============================================
# Cargar entrypoint de la capa anterior (ubseguridad)
# =============================================
load_entrypoint_seguridad() {
    echo "Ejecutando entrypoint seguridad..." >> "$LOG_FILE"

    if [ -f /root/admin/ubseguridad/jhlwstart.sh ]; then
        bash /root/admin/ubseguridad/jhlwstart.sh
        echo "Entrypoint seguridad ejecutado" >> "$LOG_FILE"
    else
        echo "ADVERTENCIA: No se encontró /root/admin/ubseguridad/jhlwstart.sh" >> "$LOG_FILE"
    fi
}

# =============================================
# Inicializar cluster de PostgreSQL
# =============================================
inicializar_cluster() {
    PGDATA="/var/lib/postgresql/data"

    if [ ! -f "$PGDATA/PG_VERSION" ]; then
        echo "Inicializando cluster PostgreSQL..." >> "$LOG_FILE"
        su - postgres -c "/usr/lib/postgresql/15/bin/initdb -D $PGDATA"
        echo "Cluster inicializado" >> "$LOG_FILE"
    else
        echo "Cluster PostgreSQL ya existe, saltando inicialización" >> "$LOG_FILE"
    fi
}

# =============================================
# Configurar acceso remoto
# =============================================
configurar_acceso() {
    PGDATA="/var/lib/postgresql/data"

    echo "Configurando acceso remoto..." >> "$LOG_FILE"

    # Escuchar en todas las interfaces
    sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" "$PGDATA/postgresql.conf"
    sed -i "s/#port = 5432/port = $PG_PORT/" "$PGDATA/postgresql.conf"

    # Permitir conexiones desde cualquier IP con contraseña
    if ! grep -q "host all all 0.0.0.0/0 md5" "$PGDATA/pg_hba.conf"; then
        echo "host all all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
    fi

    echo "Acceso remoto configurado" >> "$LOG_FILE"
}

# =============================================
# Crear usuario y base de datos
# =============================================
crear_usuario_y_bd() {
    echo "Arrancando PostgreSQL temporalmente para configuración..." >> "$LOG_FILE"

    # Arrancar PostgreSQL temporalmente
    su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D /var/lib/postgresql/data start -w -l /var/lib/postgresql/logfile"

    # Configurar contraseña del usuario postgres
    su - postgres -c "psql -c \"ALTER USER $PG_USER WITH PASSWORD '$PG_PASSWORD';\""
    echo "Contraseña del usuario '$PG_USER' configurada" >> "$LOG_FILE"

    # Crear base de datos si no existe
    su - postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname='$PG_DATABASE'\"" | grep -q 1 || \
    su - postgres -c "psql -c \"CREATE DATABASE $PG_DATABASE OWNER $PG_USER;\""
    echo "Base de datos '$PG_DATABASE' creada/verificada" >> "$LOG_FILE"

    # Otorgar privilegios
    su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $PG_DATABASE TO $PG_USER;\""
    echo "Privilegios otorgados a '$PG_USER' sobre '$PG_DATABASE'" >> "$LOG_FILE"

    # Parar PostgreSQL tras la configuración
    su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D /var/lib/postgresql/data stop -w"

    echo "Configuración de usuario y BD completada" >> "$LOG_FILE"
}

# =============================================
# Arrancar PostgreSQL en segundo plano
# =============================================
arrancar_postgresql_background() {
    echo "Arrancando PostgreSQL en segundo plano..." >> "$LOG_FILE"
    su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D /var/lib/postgresql/data start -w -l /var/lib/postgresql/logfile" &
    echo "PostgreSQL arrancado en segundo plano" >> "$LOG_FILE"
}

# =============================================
# Main
# =============================================
main() {
    mkdir -p "$LOG_DIR"
    touch "$LOG_FILE"

    echo "=== Iniciando capa PostgreSQL ===" >> "$LOG_FILE"
    echo "Fecha: $(date)" >> "$LOG_FILE"
    echo "Usuario: $PG_USER | BD: $PG_DATABASE | Puerto: $PG_PORT" >> "$LOG_FILE"

    load_entrypoint_seguridad
    inicializar_cluster
    configurar_acceso
    crear_usuario_y_bd
    arrancar_postgresql_background

    echo "=== Capa PostgreSQL configurada correctamente ===" >> "$LOG_FILE"
}

main
