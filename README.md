# StockFlow-API
API REST para gerenciamento de estoque: produtos, categorias, fornecedores, movimentações e autenticação.

---

## Tecnologias

- Node.js
- TypeScript
- AdonisJS
- Lucid ORM
- JWT
- MySQL (ou outra base suportada pelo Adonis)

---

## Funcionalidades principais

- Autenticação e controle de sessões
- Gestão de usuários com roles (admin / user)
- CRUD de produtos, categorias e fornecedores
- Controle de estoque com movimentações (entrada/saída/ajuste)
- Validações e paginação
- Migrations e seeders para popular o banco

---

## Estrutura do projeto

```bash
app/
├── controllers/
├── services/
├── validators/
├── middleware/
├── transformers/
├── models/
├── utils/

database/
├── migrations/
├── seeders/

start/
├── routes.ts

bin/
├── server.ts
```

---

## Variáveis de ambiente (exemplo)

As variáveis abaixo são as esperadas pelo projeto (definidas em `start/env.ts` e usadas em `config/database.ts`):

```env
NODE_ENV=development
PORT=3333
HOST=127.0.0.1
LOG_LEVEL=info

APP_KEY=alguma_chave_secreta
APP_URL=http://localhost:3333
SESSION_DRIVER=cookie

# Database (usadas pelo config/database.ts)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_DATABASE=stock
# Resend (serviço de email)
RESEND_API_KEY=seu_token_resend_aqui
```

Adapte os valores conforme seu ambiente.

---

## Scripts úteis (via `package.json`)

- `npm run start` — inicia o servidor usando `tsx bin/server.ts`
- `npm run dev` — modo dev do Adonis (`tsx ace`)
- `npm run dev:api` — inicia o server com `--watch`
- `npm run dev:nodemon` — inicia com `nodemon` para reload
- `npm run build` — build do Adonis (`node ace build`)
- `npm run lint` — roda o ESLint
- `npm run format` — formata com Prettier
- `npm run typecheck` — checa tipos com `tsc --noEmit`

---

## Banco de dados

Rode migrations e seeders usando os comandos do Ace:

```bash
node ace migration:run
node ace db:seed
```

Se usar MySQL, instale o driver já presente nas dependências (`mysql2`).

---

## Executando localmente

1. Instale dependências:

```bash
npm install
```

2. Copie `.env.example` para `.env` e ajuste as variáveis (ou crie um `.env` com as chaves acima).

3. Rode migrations e seeders (se necessário):

```bash
node ace migration:run
node ace db:seed
```

4. Inicie em modo desenvolvimento:

```bash
npm run dev:api
# ou
npm run dev:nodemon
```

O servidor padrão escuta a porta definida em `PORT` (ex.: `http://localhost:3333`).

---

## Rotas principais (resumo)

- Auth: `POST /login`, `POST /register`
- Products: `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`
- Categories: `GET /categories`, `POST /categories`, `PUT /categories/:id`, `DELETE /categories/:id`
- Suppliers: `GET /suppliers`, `POST /suppliers`, `PUT /suppliers/:id`, `DELETE /suppliers/:id`
- Stock Movements: `GET /stock-movements`, `POST /stock-movements`

Consulte [start/routes.ts](stockflow-api/start/routes.ts#L1) para o mapa completo de rotas.

---

## Licença

Projeto licenciado sob MIT.

