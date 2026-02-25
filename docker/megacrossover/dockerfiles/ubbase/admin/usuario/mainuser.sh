#!/bin/bash

comprobar_usuario(){
    if grep -q "^javier:" /etc/passwd 
    then
        echo "El usuario javier ya existe." >> /root/logs/informe.log
        return 1
    else
        echo "El usuario javier no existe. Creando usuario..." >> /root/logs/informe.log
        return 0
    fi
}

comprobar_directorio(){
    if [ ! -d "/home/javier" ]
    then
        echo "El directorio /home/javier no existe." >> /root/logs/informe.log
        return 0
    else
        echo "El directorio /home/javier ya existe." >> /root/logs/informe.log
        return 1
    fi
}

crear_usuario(){
    comprobar_usuario
    if [ $? -eq 0 ]
    then
        comprobar_directorio
        if [ $? -eq 0 ]
        then
            useradd -rm -d /home/javier -s /bin/bash javier
            echo "javier:1234" | chpasswd
            echo "Bienvenido javier" > /home/javier/welcome.txt
            echo "Usuario javier creado con éxito." >> /root/logs/informe.log
            return 0
        else
            echo "No se puede crear el usuario javier porque el directorio ya existe." >> /root/logs/informe.log
            return 1
        fi
    else
        echo "No se puede crear el usuario javier porque ya existe." >> /root/logs/informe.log
        return 1
    fi
}