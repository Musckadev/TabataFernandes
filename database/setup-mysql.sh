#!/bin/bash

# Atualizar o sistema
sudo apt update
sudo apt upgrade -y

# Instalar o MySQL
sudo apt install mysql-server -y

# Iniciar o MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Configurar o MySQL para aceitar conexões externas
sudo sed -i 's/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf

# Reiniciar o MySQL para aplicar as alterações
sudo systemctl restart mysql

# Criar usuário e banco de dados
sudo mysql -e "CREATE DATABASE IF NOT EXISTS tabata_fernandes;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'tabata'@'localhost' IDENTIFIED BY 'sua_senha_aqui';"
sudo mysql -e "GRANT ALL PRIVILEGES ON tabata_fernandes.* TO 'tabata'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Importar o schema
sudo mysql tabata_fernandes < /root/tabata-fernandes/database/schema.sql

echo "MySQL instalado e configurado com sucesso!"
