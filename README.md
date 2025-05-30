# Rocket Shop

Breve descrição do projeto: Um sistema de compras online desenvolvido com React, TypeScript, Vite e Tailwind CSS, utilizando pnpm como gerenciador de pacotes.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) (Para instalar o pnpm, caso ainda não o tenha: `npm install -g pnpm`)

## Como Rodar a Aplicação Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/GabrielViniciusss/Rocketlab-Frontend.git
    cd Rocketlab-Frontend
    ```
2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm dev
    ```

4.  **Abra no navegador:**
    Acesse `http://localhost:5173` (ou a porta que o Vite indicar no terminal) no seu navegador.

## Estrutura do Projeto

- `src/pages/Home/Home.tsx` - Página inicial que contém a lista de produtos
- `src/pages/ProductDetail/ProductDetail.tsx` - Página de detalhes do produto
- `src/pages/Cart/CartPage.tsx` - Página final de compra
- `src/components/` - Componentes compartilhados (navbar, icons)
- `src/context/CartContext.tsx` - Lógica para salvar o estado do carrinho nas diferentes páginas
- `src/data/products.json` - Dados dos produtos

---
