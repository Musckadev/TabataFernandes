$server = "46.202.149.39"
$username = "root"
$password = "Pedro.Luiza@0204#"

# Criar arquivo com a senha
$password | Out-File -FilePath ".\sshpass.txt"

# Enviar o arquivo setup-server.sh
scp -o StrictHostKeyChecking=no setup-server.sh ${username}@${server}:/root/

# Executar o script
ssh -o StrictHostKeyChecking=no ${username}@${server} "chmod +x /root/setup-server.sh && /root/setup-server.sh"

# Remover arquivo de senha
Remove-Item -Path ".\sshpass.txt"
