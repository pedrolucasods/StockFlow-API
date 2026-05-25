# StockFlow-API
API REST para gerenciamento de estoque com autenticação, controle de produtos, categorias, fornecedores e movimentações, focada em organização de dados, regras de negócio e estrutura de backend escalável.

---

## Tecnologias

* Node.js
* TypeScript
* AdonisJS
* Lucid ORM
* JWT Authentication
* MySQL

---

## Funcionalidades

* Autenticação de usuários
* Controle de permissões (admin/user)
* CRUD de produtos
* CRUD de categorias
* CRUD de fornecedores
* Controle de estoque
* Movimentações de entrada e saída
* Histórico de movimentações
* Validação de dados
* Paginação e filtros

---

## Estrutura do projeto

```bash id="proj1"
app/
├── controllers/
├── services/
├── validators/
├── middleware/
├── utils/

database/
├── migrations/
├── seeders/

start/
├── routes.ts
```

---

## Entidades

### Users

```txt id="users1"
id
name
email
password
role
created_at
updated_at
```

---

### Products

```txt id="prod1"
id
name
description
sku
barcode
price
cost_price
quantity
minimum_quantity
category_id
supplier_id
created_at
updated_at
```

---

### Categories

```txt id="cat1"
id
name
description
created_at
updated_at
```

---

### Suppliers

```txt id="sup1"
id
name
email
phone
cnpj
address
created_at
updated_at
```

---

### Stock Movements

```txt id="mov1"
id
product_id
user_id
type
quantity
reason
created_at
updated_at
```

---

## Tipos de movimentação

```ts id="movtype"
ENTRY
EXIT
ADJUSTMENT
```

---

## Relacionamentos

```txt id="rels1"
Product belongsTo Category
Product belongsTo Supplier
Product hasMany StockMovements

Category hasMany Products

Supplier hasMany Products

User hasMany StockMovements
```

---

## Regras de negócio

* SKU deve ser único
* Não permitir estoque negativo
* Movimentações obrigatórias para alterações de estoque
* Apenas usuários autenticados acessam rotas protegidas
* Admin pode gerenciar produtos, categorias e fornecedores

---

## Estrutura de arquitetura

* Controllers: recebem requests e retornam responses
* Services: regras de negócio (SKU, estoque, validações complexas)
* Validators: validação de entrada de dados
* Middleware: autenticação e permissões
* Utils: funções genéricas reutilizáveis

---

## Instalação

```bash id="inst1"
git clone <repo-url>
```

```bash id="inst2"
npm install
```

---

## Configuração .env

```env id="env1"
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB_NAME=stock
```

---

## Migrations

```bash id="mig1"
node ace migration:run
```

---

## Seeders

```bash id="seed1"
node ace db:seed
```

---

## Executar projeto

```bash id="run1"
node ace serve --watch
```

---

## Rotas principais

### Auth

```http id="auth1"
POST /login
POST /register
```

---

### Products

```http id="prodroute"
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id
```

---

### Categories

```http id="catroute"
GET /categories
POST /categories
PUT /categories/:id
DELETE /categories/:id
```

---

### Suppliers

```http id="suproute"
GET /suppliers
POST /suppliers
PUT /suppliers/:id
DELETE /suppliers/:id
```

---

### Stock Movements

```http id="movroute"
GET /stock-movements
POST /stock-movements
```

---

## Objetivo do projeto

Praticar desenvolvimento backend com foco em:

* arquitetura de APIs REST
* autenticação JWT
* modelagem de banco de dados relacional
* regras de negócio
* organização de código em camadas
* uso de AdonisJS em projetos reais

---
