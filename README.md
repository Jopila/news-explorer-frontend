# News Explorer – Frontend

Frontend em React (Vite) para o aplicativo News Explorer do bootcamp TripleTen. Hoje a busca e o login são simulados em memória: as notícias são filtradas de um array estático e a autenticação/salvamento usa estados locais (sem API ou persistência).

## Requisitos

- Node.js 18+ (recomendado Node 20). Em WSL, use WSL 2 para melhor compatibilidade.

## Scripts

- `npm install` — instala dependências.
- `npm run dev` — ambiente de desenvolvimento com Vite.
- `npm run build` — build de produção.
- `npm run preview` — serve o build localmente.
- `npm run lint` — analisa o código com ESLint.

## Estrutura do projeto

- `src/main.jsx` — monta o app com React Router.
- `src/components/App/App.jsx` — estado global simples (busca, loading, login fake, popups, cards salvos).
- `src/components` — componentes React com CSS próprio:
  - Layout: `Header`, `Navigation`, `Footer`
  - Busca/resultado: `SearchForm`, `SearchResults`, `NewsCard`, `NewsCardList`, `Preloader`, `NotFound`
  - Salvos: `SavedNews`, `SavedNewsHeader`
  - Popups: `LoginPopup`, `SignupPopup`, `SignupSuccessPopup`, `PopupWithForm`, `ModalWithForm` (genérico)
  - Informativo: `About`
- `src/images` — imagens estáticas.
- `src/vendor/fonts` — fontes locais (Inter, Roboto, Roboto Slab, Source Sans Pro).
- `src/vendor/normalize.css` — reset básico para consistência entre navegadores.
- `src/utils` — helpers (ex.: `mockNews.js` com dados de notícias mockadas).

## Funcionalidades atuais

- Busca client-side com atraso simulado (1.5s) e filtro por título/descrição/palavra-chave.
- Paginação simples de resultados (3 cards por clique em “Mostrar mais”).
- Login/cadastro de exemplo: validação de formulário, estados locais, popups de sucesso/erro.
- Salvamento/remoção de artigos em memória com destaque de bookmark/trash; tooltips para estados não logados.
- Página de artigos salvos com resumo de palavras-chave (“2 principais, e X outras”).
- Troca de tema do Header conforme a rota (`/` escuro, `/saved-news` claro) e menu mobile hambúrguer.

## UI e responsividade (conforme Figma / replit.md)

- Mobile (320–640px): hero 536px de altura, título 36/40px, SearchForm empilhado 288x56; cards 288x440 com imagem 196px; grid 1 coluna; header menu escuro (#1A1B22); footer 176px empilhado; About com foto circular centralizada 272px.
- Tablet (~768–960px): grid 2–3 colunas de cards (224px), Saved News com keyword tag e trash, header 66px, espaçamentos ajustados.
- Desktop: cards 400x576 em 3 colunas, seção resultados com botão “Mostrar mais” 288x64; hero centralizado com fundo; subtítulo atualizado.
- Cores principais: #1A1B22 (texto/tema escuro), #B6BCBF (texto secundário), #2F71E5 (ações), #F5F6F7 (fundos).

## Rotas

- `/` — busca, resultados e seção “Sobre o autor”.
- `/saved-news` — lista artigos salvos do estado local (sem proteção real de rota).

## Estado e comportamento

- Estados no `App.jsx`: `results`, `isLoading`, `hasSearched`, `isLoggedIn`, `currentUser`, `registeredUser`, `userSavedCards`, `savedCardIds`, controle de popups e erros de servidor (placeholder). Dados de notícias vindos de `src/utils/mockNews.js` até integrar o backend.
- Busca limpa estado ao clicar na marca (“NewsExplorer”).
- Bookmarks alternam entre salvo/remoção; no modo não logado o botão mostra tooltip e fica desabilitado.

## Dependências

- Runtime: `react`, `react-dom`, `react-router-dom`.
- Dev: `vite`, `@vitejs/plugin-react`, `eslint` (com plugins react-hooks e react-refresh), `globals`.

## Configuração de desenvolvimento

- Vite configurado para rodar em `0.0.0.0:5000` com `allowedHosts` para Replit.
- ESLint: regras recomendadas JS + react-hooks + only-export-components (warn).

## Próximos passos sugeridos

- Integrar APIs reais (news backend e auth), mover estados para context/queries.
- Proteger a rota de salvos e persistir sessão/tokens.
- Adicionar testes (unitários de UI e integração de fluxo de busca/salvos).
