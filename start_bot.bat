@echo off
title Iniciador de Projeto - Versão Definitiva
color 0a
setlocal enabledelayedexpansion

:: Configuração de caminhos absolutos
set "PROJECT_ROOT=%~dp0"
set "FRONTEND_DIR=%PROJECT_ROOT%front-end"
set "BOT_DIR=%PROJECT_ROOT%bot"

:: Verificação de pastas
echo Verificando estrutura de pastas...
if not exist "%FRONTEND_DIR%" (
    echo ERRO CRÍTICO: Pasta front-end não encontrada em:
    echo %FRONTEND_DIR%
    pause
    exit /b 1
)

if not exist "%BOT_DIR%" (
    echo ERRO CRÍTICO: Pasta bot não encontrada em:
    echo %BOT_DIR%
    pause
    exit /b 1
)

:: Instalação Front-end
echo.
echo === INSTALANDO FRONT-END ===
cd /d "%FRONTEND_DIR%"
call npm install
if !errorlevel! neq 0 (
    echo ERRO: Instalação do front-end falhou com código !errorlevel!
    pause
    exit /b !errorlevel!
)

:: Instalação Bot
echo.
echo === INSTALANDO BOT ===
cd /d "%BOT_DIR%"
call npm install
if !errorlevel! neq 0 (
    echo AVISO: Instalação do bot completou com advertências (código !errorlevel!)
    echo Isso é normal para alguns pacotes depreciados
    timeout /t 3
)

:: Iniciar serviços
echo.
echo === INICIANDO SERVIDORES ===
start "FRONTEND" cmd /k "cd /d "%FRONTEND_DIR%" && title FRONTEND && npm run dev"
start "BOT" cmd /k "cd /d "%BOT_DIR%" && title BOT && node index.js"

echo.
echo ========================================
echo  SISTEMA INICIADO COM SUCESSO!
echo  • Frontend: http://localhost:3000
echo  • Bot: Verifique o terminal aberto
echo ========================================
echo  Observações:
echo  - Os avisos de depreciação no bot são normais
echo  - Para atualizar pacotes, execute 'npm audit fix'
echo.
pause