# **📱 Maturador**
O Maturador de Chip é uma aplicação desenvolvida para automatizar interações com o objetivo de realizar o processo de maturação (aquecimento) de números recém-ativados.

## Tecnologias Utilizadas
![Database](https://img.shields.io/badge/Database_Design-4479A1?style=for-the-badge&logo=white) - Banco de dados

![API](https://img.shields.io/badge/API-%2300f.svg?style=for-the-badge&logo=white) - Evolution API

![N8N](https://img.shields.io/badge/N8N-00758F?style=for-the-badge&logo=white)- N8N com javascript
  
![NJ](https://img.shields.io/badge/NJ-FF6F00?style=for-the-badge&logo=white) - Node.js
  
![WA](https://img.shields.io/badge/WA_Web-brightgreen?style=for-the-badge) - Biblioteca de automação do WA Web 

## Requisitos funcionais:
- RF01 – **Cadastro de Chips.**
- RF02 – **Integração com WA Web.**
- RF03 – **Envio automatizado de mensagens.**
- RF04 – **Direcionamento de mensagens à números cadastrados.**
- RF05 – **Tela de monitoromento quando maturar.**
- RF06 – **Configuração de intervalo de tempo entre mensagens.**
- RF07 – **Configurar descanso entre uma quantidade fixa de mensagens disparadas.**
- RF08 – **Autenticação e Validação de Login.**
- RF09 – **Geração de texto com API de IA Generativa.**

# Requisitos Não-funcionais:
- RNF01 - **Suportar execução simultânea de múltiplas sessões WA Web.**
- RNF02 - **Processamento eficiente.**
- RNF03 – **Atualizações sem impacto nos processos ativos.**
- RNF04 – **Recuperação automática de sessão.**
- RNF05 - **Retentativa automática em falhas temporárias.**
- RNF06 - **Arquitetura modular, se possível.**
- RNF07 - **Sistema resiliente a quedas do navegador.**
- RNF08 - **Logs estruturados.**

## Aplicação desktop (Electron)
O programa foi recriado como uma aplicação Electron que abre uma janela de desktop. Ele contém a interface de usuário para cadastro e monitoração, além de um **webview** que carrega o WhatsApp Web. A maturação dos chips ocorre por meio de interações feitas diretamente dentro do WhatsApp Web.

### Estrutura de arquivos
O diretório principal da interface está em `frontend/` e inclui:

- `package.json` – configura o projeto Electron.
- `main.js` – processo principal que cria a janela.
- `preload.js` – pontes (bridge) seguras para o renderer, se precisar.
- `index.html` – marcação da interface.
- `style.css` – estilos básicos.
- `renderer.js` – lógica de interface, eventos e chamadas às APIs.

### Como executar
1. Abra um terminal no diretório `frontend`.
2. Rode `npm install` para instalar o Electron.
3. Execute `npm start` para iniciar a aplicação. Uma janela nativa se abrirá.
4. Na janela, clique em **Abrir WhatsApp Web** para carregar a página do WhatsApp dentro do app.
5. Escaneie o QR code normalmente e use o próprio WhatsApp Web para enviar mensagens e maturar chips.

> A aplicação é apenas front-end; nenhuma lógica de backend é necessária para executar a interface. Os placeholders em `renderer.js` mostram onde adicionar chamadas à Evolution API ou n8n se forem usadas posteriormente.

### APIs inclusas
- **Evolution API**: método `maturateChip` em `renderer.js`.
- **n8n webhook**: método `sendMessage` em `renderer.js`.

Os endpoints e tokens são exemplos e devem ser substituídos pelos valores reais de sua infraestrutura.

### Observações
- Como o processo de maturação ocorre no WhatsApp Web, qualquer automação extra (scripts injetados, bibliotecas de automação) deve ser adicionada ao `renderer.js` ou ao próprio `webview`.
- A janela do Electron permite abrir múltiplos webviews se desejar suportar várias sessões.
