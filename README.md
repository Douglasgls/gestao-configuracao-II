## Status
![CI](https://badgen.net/github/checks/douglasgls/gestao-configuracao-II/main)
![activity](https://badgen.net/github/last-commit/douglasgls/gestao-configuracao-II)
# Projeto da Disciplina de Gestão de Configuração II

Este é o projeto desenvolvido para a disciplina de Gestão de Configuração II, ministrada pelo professor Luis Eduardo. A aplicação foi construída utilizando o framework **NestJS**.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Um framework Node.js progressivo para construir aplicações eficientes, confiáveis e escaláveis.
- [TypeScript](https://www.typescriptlang.org/)

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## ⚙️ Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Douglasgls/gestao-configuracao-II.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd gestao-configuracao-II
    ```

3.  **Instale as dependências:**
    ```bash
    $ npm install
    ```

4.  **Rode a aplicação:**

    ```bash
    # Modo de desenvolvimento
    $ npm run start

    # Modo "watch" (reinicia automaticamente ao salvar alterações)
    $ npm run start:dev
    ```

5.  A aplicação estará disponível em `http://localhost:3000/api`.

## Endpoints da API

A seguir estão as rotas disponíveis na aplicação:

-   **`GET /api/products/hello`**: Retorna uma mensagem de saudação.
-   **`GET /api/products`**: Retorna uma lista de todos os produtos.
-   **`POST /api/products`**: Cria um novo produto.
    body:{
        name: string,
        price: number
    }

---

## WorkFlow GitFlow

Escolhi o GitFlow como minha estratégia de desenvolvimento, pois ele me ajudou a manter um fluxo de trabalho mais organizado e colaborativo. Essa estrategia me pareceu a mais robusta e eficiente quando usada em um projeto grande com muitos desenvolvedores, evitando desorganização e mantendo um fluxo consistente.


### Desenvolvido por

* [Douglas Paz](https://github.com/douglasgls)
