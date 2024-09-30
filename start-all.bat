@echo off

REM Navegar para a pasta da API e iniciar com Docker Compose
cd APIRastreioTC
docker-compose up -d

REM Voltar para o diretório raiz
cd ..

REM Navegar para a pasta do app React Native e iniciar com Expo usando o modo tunnel
cd RastreioTapajosComercio
start npx expo start --tunnel

REM Voltar para o diretório raiz
cd ..

REM Navegar para a pasta da página web e iniciar com React
cd webrastreiotapajoscomercio
start npm start

@REM start-all.bat