# ProjetosReactNative

## Sumário
- [Introdução](#introdução)
- [API](#api)
  - [Instalação](#instalação-da-api)
  - [Uso](#uso-da-api)
- [App](#app)
  - [Instalação](#instalação-do-app)
  - [Uso](#uso-do-app)
- [Web](#web)
  - [Instalação](#instalação-do-web)
  - [Uso](#uso-do-web)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução
Este repositório contém três componentes principais:
1. **API**: Backend que fornece endpoints para o aplicativo e a aplicação web.
2. **App**: Aplicativo móvel desenvolvido em React Native.
3. **Web**: Aplicação web desenvolvida em React.

## API

### Instalação da API
1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/ProjetosReactNative.git
    cd ProjetosReactNative/api
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do diretório `api` e adicione suas variáveis de ambiente.
    ```env
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/sua-base-de-dados
    JWT_SECRET=sua-chave-secreta
    ```

4. Inicie o servidor:
    ```sh
    npm start
    ```

### Uso da API
A API fornece os seguintes endpoints:
- `POST /api/users/login`: Autenticação de usuários.
- `POST /api/users/register`: Registro de novos usuários.
- `GET /api/users/user/`: Obtenção de perfil de usuário (requer autenticação).

## App

### Instalação do App
1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/ProjetosReactNative.git
    cd ProjetosReactNative/app
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do diretório `app` e adicione suas variáveis de ambiente.
    ```env
    API_URL=http://localhost:3000/api
    ```

4. Inicie o aplicativo:
    ```sh
    npm start
    ```
5. Siga as instruções no terminal para abrir o aplicativo no emulador ou dispositivo físico.

### Uso do App
O aplicativo móvel permite que os usuários:
- Registrem-se e façam login.
- Visualizem e atualizem seu perfil.
- Acessem funcionalidades específicas do aplicativo.

## Web

### Instalação do Web
1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/ProjetosReactNative.git
    cd ProjetosReactNative/web
    ```
2. Instale as dependências:
    ```sh
    npm install
    ```
3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do diretório `web` e adicione suas variáveis de ambiente.
    ```env
    REACT_APP_API_URL=http://localhost:3000/api
    ```

4. Inicie a aplicação web:
    ```sh
    npm start
    ```

### Uso do Web
A aplicação web permite que os usuários:
- Registrem-se e façam login.
- Visualizem e atualizem seu perfil.
- Acessem funcionalidades específicas da aplicação web.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.