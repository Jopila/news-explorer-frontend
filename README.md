# News Explorer - Frontend

Frontend do projeto News Explorer do bootcamp TripleTen. Aplicacao em React (Vite) que busca noticias via NewsAPI e permite cadastro/login, alem de salvar/remover artigos usando a API do backend.

## URL do projeto

https://newsexplorerapp.netlify.app

## Funcionalidades

- Busca noticias dos ultimos 7 dias (pt-BR), com estado de carregamento, erro e vazio.
- Paginacao incremental com botao "Mostrar mais" (3 cards por clique).
- Cadastro e login com validacao de formulario e feedback de erro.
- Utilizacao de banco de dados para persistencia das informacoes aos usuarios.
- Salvar/remover artigos com sincronizacao no backend e indicadores visuais.
- Area de artigos salvos com resumo de palavras-chave.
- Persistencia local do ultimo termo de busca e do token de sessao.

## Requisitos

- Node.js 18+ (recomendado Node 20).

## Configuracao

Crie um arquivo `.env` na raiz (opcional) com as variaveis abaixo:

```bash
VITE_NEWS_API_KEY=sua_chave
VITE_MAIN_API_BASE_URL=https://seu-backend.exemplo
```

Observacoes:

- Se `VITE_NEWS_API_KEY` nao for definida, o app usa a chave padrao presente no codigo.
- Se `VITE_MAIN_API_BASE_URL` nao for definida, o app usa o backend padrao configurado em `src/utils/config.js`.

## Scripts

- `npm install` - instala dependencias.
- `npm run dev` - ambiente de desenvolvimento com Vite.
- `npm run build` - build de producao.
- `npm run preview` - serve o build localmente.
- `npm run lint` - analisa o codigo com ESLint.

## Rotas

- `/` - busca, resultados e secao "Sobre o autor".
- `/saved-news` - artigos salvos (rota protegida: redireciona para `/` e abre login se nao autenticado).

## Estrutura do projeto

- `src/main.jsx` - inicializa o React Router e o App.
- `src/components/App/App.jsx` - estado global (busca, autenticacao, popups, artigos salvos).
- `src/components` - componentes de UI (Header, SearchForm, SearchResults, NewsCard, SavedNews, popups, etc.).
- `src/utils/newsApi.js` - consumo da NewsAPI.
- `src/utils/MainApi.js` - cadastro, login e perfil do usuario.
- `src/utils/savedNewsApi.js` - CRUD de artigos salvos.
- `src/vendor` - fontes locais e normalize.

## Stack

- React 18, React Router, Vite
- ESLint
