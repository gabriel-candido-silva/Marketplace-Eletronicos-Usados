# Marketplace de Eletrônicos Usados

## Descrição
Este projeto é uma aplicação frontend para um marketplace de eletrônicos usados, construída com HTML, CSS e JavaScript puro. A interface consome uma API pública para exibir produtos, permitir o cadastro de anúncios e oferecer um painel administrativo com autenticação.

## Objetivo
Criar uma experiência simples e responsiva para que usuários possam visualizar produtos disponíveis e que administradores possam cadastrar, editar e excluir anúncios de forma prática.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript vanilla
- Fetch API
- Cloudinary para upload de imagens
- API REST hospedada no Render

## Funcionalidades implementadas
- Listagem de produtos na página inicial
- Página administrativa para gerenciar anúncios
- Formulário para cadastro de produtos
- Preview de imagem antes do envio
- Login administrativo com autenticação via API
- Edição e exclusão de anúncios
- Layout responsivo para celulares, tablets e notebooks

## Como executar localmente
1. Clone este repositório.
2. Abra a pasta do projeto no seu editor de código.
3. Execute o arquivo `index.html` em um navegador, ou use uma extensão local como Live Server.
4. Para o painel administrativo, acesse a página de login através do botão "Painel Administrador".

## Deploy
- Repositório GitHub: https://github.com/gabriel-candido-silva/Marketplace-Eletronicos-Usados

- GitHub Pages: https://gabriel-candido-silva.github.io/Marketplace-Eletronicos-Usados/

- API utilizada: https://base-back-dwpz.onrender.com

## Vídeo pitch
- Link do vídeo pitch: https://youtu.be/cVWnmLzQwTc

## Estrutura básica do projeto
```text
.
├── admin.html
├── index.html
├── login.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── app.js
│   ├── abrirLogin.js
│   ├── autenticarAdmin.js
│   ├── cloudinary.js
│   └── preview.js
└── README.md
```

## Decisões técnicas relevantes
- A aplicação foi desenvolvida sem frameworks, seguindo o requisito do projeto.
- A navegação entre páginas foi organizada para manter uma experiência visual consistente.
- O formulário de cadastro foi estruturado para enviar os dados no formato esperado pela API.
- A autenticação administrativa foi implementada com token salvo no localStorage.

## Autor(es)
- Gabriel Candido da Silva

