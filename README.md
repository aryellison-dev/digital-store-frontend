# Digital Store — Front-end React + TypeScript

Aplicação React com front-end independente do back-end. A Home foi ajustada a partir das imagens exportadas do Figma (desktop 1440 px e mobile 375 px). A revisão corrigiu a ordem do banner no mobile, a abertura da busca no cabeçalho, a navegação para o carrinho, o estado da galeria de imagens, a barra de ordenação e os filtros da listagem. O repositório original disponibilizou os logos, ícones, imagens de coleções e cards. Duas imagens foram recortadas dos frames fornecidos pelo usuário para reproduzir os destaques Nike e Air Jordan, que não estavam nos assets do repositório.

## Rodar localmente

Requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

Acesse http://localhost:5173.

Para gerar versão de produção:

```bash
npm run check:assets
npm run build
npm run preview
```

## Rotas

- `/`: página inicial, com hero, coleções, categorias, produtos e oferta especial;
- `/products`: listagem, busca, filtros e ordenação;
- `/product/:id`: detalhes e seleção de opções;
- login, cadastro e pedidos: rotas provisórias para futuro back-end.

## Organização

- `src/components`: componentes compartilhados;
- `src/pages`: páginas;
- `src/data`: catálogo de demonstração;
- `src/services`: interface de acesso ao catálogo, preparada para integração;
- `src/types`: modelos TypeScript;
- `public/assets`: assets locais usados pelo site;
- `docs/reference`: capturas de referência do layout, que não são enviadas ao diretório estático do build.

## Situação atual

Fase 1 de refinamento visual: Home desktop/mobile. Listagem e detalhes continuam implementados funcionalmente a partir da versão anterior, mas exigem conferência pixel a pixel frente aos frames enviados. A tipografia usa Inter e tokens responsivos; a fonte é carregada pelo Google Fonts quando há internet, com fallback sans-serif. A verificação sintática dos arquivos TypeScript/TSX e a existência dos assets passaram. A instalação de dependências expirou neste ambiente; por isso, o build de produção ainda precisa ser validado localmente com `npm install && npm run build`. A listagem e os detalhes **não estão homologados como pixel-perfect** frente às telas. O frontend ainda usa mocks, e telas de conta/carrinho seguem como placeholders.
