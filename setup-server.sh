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

# Configurar diretório da aplicação
APP_DIR="/var/www/tabata"
if [ -d "$APP_DIR" ]; then
    echo "Atualizando repositório existente..."
    cd $APP_DIR
    # Fazer backup do .env se existir
    if [ -f .env ]; then
        cp .env .env.backup
    fi
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
    mkdir -p $APP_DIR
    cd $APP_DIR
    git clone https://github.com/Musckadev/TabataFernandes.git .
    check_error "Falha ao clonar repositório"
fi

# Instalar dependências e fazer build
echo "Instalando dependências..."
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
    }
}
EOL

# Ativar o site
ln -sf /etc/nginx/sites-available/tabata /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
nginx -t
check_error "Configuração do Nginx inválida"

# Reiniciar Nginx
systemctl restart nginx
check_error "Falha ao reiniciar Nginx"

# Gerenciar aplicação com PM2
cd $APP_DIR
pm2 delete tabata 2>/dev/null || true  # Tenta parar se já existir
pm2 start npm --name "tabata" -- start
check_error "Falha ao iniciar aplicação com PM2"
pm2 save
pm2 startup
check_error "Falha ao configurar PM2 startup"

echo "Deploy concluído com sucesso!"
