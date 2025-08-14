@echo off
echo Instalando dependências do front-end...
cd front-end
npm install

echo Instalando dependências do bot...
cd bot
npm install

echo Iniciando o front-end...
start cmd /k "cd front-end && npm run dev"

echo Iniciando o bot...
start cmd /k "cd bot && node index.js"

pause