#!/bin/bash

# Atualizar o sistema
apt update
apt upgrade -y

# Instalar curl e outras dependências
apt install -y curl git build-essential

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar versões
node --version
npm --version

# Instalar PM2 globalmente
npm install pm2 -g

# Instalar Nginx
apt install -y nginx

# Iniciar e habilitar Nginx
systemctl start nginx
systemctl enable nginx

# Criar diretório para a aplicação
mkdir -p /var/www/tabata
cd /var/www/tabata

# Clonar o repositório
git clone https://github.com/Musckadev/TabataFernandes.git .

# Instalar dependências
npm install

# Build da aplicação
npm run build

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

# Reiniciar Nginx
systemctl restart nginx

# Iniciar a aplicação com PM2
cd /var/www/tabata
pm2 start npm --name "tabata" -- start
pm2 save
pm2 startup
