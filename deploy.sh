#!/bin/bash

# Instalar dependências
npm install

# Build do projeto
npm run build

# Iniciar/Reiniciar a aplicação com PM2
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
