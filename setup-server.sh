#!/bin/bash

# Função para verificar se o comando anterior foi executado com sucesso
check_error() {
    if [ $? -ne 0 ]; then
        echo "Erro: $1"
        exit 1
    fi
}

# Atualizar o sistema
apt update
check_error "Falha ao atualizar o sistema"
apt upgrade -y
check_error "Falha ao fazer upgrade do sistema"

# Instalar curl e outras dependências
apt install -y curl git build-essential
check_error "Falha ao instalar dependências básicas"

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
check_error "Falha ao configurar repositório do Node.js"
apt install -y nodejs
check_error "Falha ao instalar Node.js"

# Verificar versões
node --version
npm --version

# Instalar PM2 globalmente
npm install pm2 -g
check_error "Falha ao instalar PM2"

# Instalar Nginx
apt install -y nginx
check_error "Falha ao instalar Nginx"

# Iniciar e habilitar Nginx
systemctl start nginx
systemctl enable nginx
check_error "Falha ao iniciar/habilitar Nginx"

# Verificar e criar diretório da aplicação
APP_DIR="/var/www/tabata"
if [ ! -d "/var/www" ]; then
    echo "Criando diretório /var/www..."
    mkdir -p /var/www
    chown -R www-data:www-data /var/www
    chmod -R 755 /var/www
fi

if [ ! -d "$APP_DIR" ]; then
    echo "Criando diretório $APP_DIR..."
    mkdir -p $APP_DIR
    chown -R www-data:www-data $APP_DIR
    chmod -R 755 $APP_DIR
fi

# Configurar diretório da aplicação
if [ -d "$APP_DIR/.git" ]; then
    echo "Atualizando repositório existente..."
    cd $APP_DIR
    # Fazer backup do .env se existir
    if [ -f .env ]; then
        cp .env .env.backup
    fi
    # Parar a aplicação se estiver rodando
    pm2 stop tabata || true
    pm2 delete tabata || true
    # Atualizar código
    git fetch origin main
    git reset --hard origin/main
    check_error "Falha ao atualizar código"
    # Restaurar .env
    if [ -f .env.backup ]; then
        mv .env.backup .env
    fi
else
    echo "Clonando repositório pela primeira vez..."
    # Limpar diretório se existir
    rm -rf $APP_DIR/*
    cd $APP_DIR
    git clone https://github.com/Musckadev/TabataFernandes.git .
    check_error "Falha ao clonar repositório"
fi

# Ajustar permissões
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Instalar dependências e fazer build
echo "Instalando dependências..."
cd $APP_DIR
npm install
check_error "Falha ao instalar dependências"

echo "Fazendo build da aplicação..."
npm run build
check_error "Falha ao fazer build"

# Configurar Nginx
cat > /etc/nginx/sites-available/tabata << 'EOL'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 1m;
        proxy_connect_timeout 1m;
    }
}
EOL

# Ativar o site
ln -sf /etc/nginx/sites-available/tabata /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
nginx -t
check_error "Configuração do Nginx inválida"

# Recarregar Nginx
systemctl reload nginx
check_error "Falha ao recarregar Nginx"

# Iniciar a aplicação com PM2
cd $APP_DIR
pm2 delete tabata || true
pm2 start ecosystem.config.js
check_error "Falha ao iniciar aplicação com PM2"

# Salvar configuração do PM2
pm2 save
check_error "Falha ao salvar configuração do PM2"

# Configurar PM2 para iniciar no boot
pm2 startup
check_error "Falha ao configurar PM2 para iniciar no boot"

# Mostrar status
echo "Verificando status dos serviços..."
systemctl status nginx
pm2 list
pm2 logs tabata --lines 50

echo "Setup concluído com sucesso!"
