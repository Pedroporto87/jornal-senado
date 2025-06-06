ccd791acd9af43a4894147d61f577031

# Jornal Senado

Este projeto é o aplicativo móvel "Jornal Senado". Siga as instruções abaixo para baixar, instalar e rodar o aplicativo em seu dispositivo móvel.

## Como instalar e rodar o aplicativo

### 1. Clonar o Repositório

Primeiro, clone o repositório do projeto em sua máquina local. No terminal, execute o seguinte comando:

```bash
git clone https://github.com/Pedroporto87/jornal-senado.git
```

### 2. Instalar Dependências

Navegue até o diretório do projeto clonado e instale as dependências do Node.js usando o NPM:

```bash
npm install
```

### 3. Instalar Expo CLI

Instale o Expo CLI globalmente para facilitar o gerenciamento do aplicativo Expo:

```bash
npm install -g expo-cli
```

### 4. Baixar o aplicativo Expo Go

No seu dispositivo móvel, baixe e instale o aplicativo **Expo Go** a partir da loja de aplicativos (Google Play Store ou Apple App Store).

### 5. Habilitar Opções de Desenvolvedor e Depuração por Wi-Fi (Android)

> **Pode haver a necessidade de habilitar essa funcionalidade**

- No dispositivo Android, vá em **Configurações** > pressione **Sobre o Telefone** para habilitar as **Opções de Desenvolvedor**.
- Habilitando essas opções, clique em **Depuração por Wi-Fi**.
- Habilite e permita conforme necessário.

### 6. Rodar o Projeto

Inicie o servidor de desenvolvimento Expo usando o seguinte comando:

```bash
npm start
```

Isso abrirá o Expo Developer Tools no navegador e exibirá um QR Code no terminal.

### 7. Abrir o aplicativo com Expo Go

- Abra o aplicativo **Expo Go** no seu dispositivo móvel.
- Use a opção **Scan QR Code** no aplicativo para escanear o QR Code exibido no terminal.

Após escanear o QR Code, o aplicativo deve iniciar automaticamente no seu dispositivo

### Breve explicação das decisões técnicas

Nesse app, eu utilizei como ideia de layout do feed de noticias do Google, que julgo ser simples e intuitivo. Preferi a utilização do Expo, pela sua simplicidade de instalação e facilidade de desenvolvimento. Eu já tive experiência com Android Studio e não gostei, principalmente da sua instalação, uso de JavaScript/TypeScript e a possibilidade de usar VSCode que já estou ambientado.

Preferi utilizar Redux para dados que teriamos a necessidade de recorrencia em outras partes do App, estados locais para soluções locais, como em modais, toggle de botões, por exemplo. A responsividade, eu utilizei o dispositivo web, porque me dava mais clareza de visualização em diferentes telas. Minha preferencia por TypeScript foi pelo motivo da tipagem dos dados e garantir mais segurança.

Eu cheguei a fazer a parte de testes, porém tive problema de versões conflitantes do react e outra biblioteca, desinstalei meu package.json, limpei cache e mesmo assim, o problema continuava, impossibilitando a inicialização do app, com isso, preferi abortar essa parte.