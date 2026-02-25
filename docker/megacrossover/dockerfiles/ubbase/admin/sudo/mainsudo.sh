#!/bin/bash

configurar_sudo() {
  echo "Configurando sudo para javier..." >> /root/logs/informe.log
  
  # Solo crear si el directorio existe
  if [ -d /etc/sudoers.d ]; then
    echo "javier ALL=(ALL) NOPASSWD: ALL" > "/etc/sudoers.d/javier"
    chmod 0440 "/etc/sudoers.d/javier"
    echo "Sudo configurado" >> /root/logs/informe.log
  else
    echo "ERROR: /etc/sudoers.d no existe" >> /root/logs/informe.log
  fi
}