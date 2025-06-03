# FastFood Autoatendimento - Tech Challenge (Grupo 277)

Este projeto é a implementação de um sistema backend para uma lanchonete com autoatendimento, utilizando TypeScript, Fastify, PrismaORM e MySQL, seguindo a arquitetura hexagonal (também conhecida como Ports and Adapters).

---

## Estrutura do Projeto

```markdown
api/                        → Coleções Postman para testes dos endpoints
docs/                       → Informações do Event Storming
src/
├── config/                 → Configurações da aplicação
│   ├── env.ts              → Configurações de ambiente
│   └── logger.ts           → Configuração de logs
│
├── core/                   → Camada central da aplicação (domínio)
│   ├── application/        → Casos de uso da aplicação
│   │   └── usecases/       → Implementação dos casos de uso
│   │       ├── client/     → Casos de uso para clientes
│   │       ├── identify/   → Casos de uso para identificação
│   │       ├── order/      → Casos de uso para pedidos
│   │       ├── payment/    → Casos de uso para pagamentos
│   │       └── product/    → Casos de uso para produtos
│   │
│   ├── domain/             → Definições de entidades e interfaces do domínio
│   │   ├── entities/       → Entidades de domínio
│   │   └── repositories/   → Interfaces dos repositórios
│   │
│   └── shared/             → Código compartilhado por toda a aplicação
│       └── errors/         → Tratamento de erros centralizados
│
├── database/               → Configurações e migrações do banco
│   ├── migrations/         → Scripts de migração para criar tabelas
│   ├── seeds/              → Scripts para popular o banco com dados iniciais
│   └── typeorm.config.ts   → Configuração do TypeORM
│
├── infrastructure/         → Camada de adaptadores e implementações concretas
│   ├── adapters/           → Adaptadores para comunicação com o mundo externo
│   │   ├── controller/     → Controladores HTTP
│   │   └── dto/            → Objetos de Transferência de Dados
│   │
│   └── persistence/        → Implementações concretas dos repositórios
│
├── interfaces/             → Interface da aplicação com o mundo externo
│   ├── errors/             → Tratamento de erros HTTP
│   └── http/               → Configuração e definição da API HTTP
│       ├── app.ts          → Configuração do Fastify
│       ├── routes/         → Definição das rotas da API
│       │   └── schema/     → Esquemas de validação das rotas
│       └── server.ts       → Inicialização do servidor HTTP
│
└── index.ts                → Ponto de entrada da aplicação
```

---

## Event Storming (DDD)

As informações bem como a imagem do event storming estão disponibilizadas na pasta /docs da aplicação.
Maiores dúvidas acionar Willian Borba (Discord: willianrocha).

---

## ✅ Tecnologias Utilizadas

- Node.js com TypeScript
- Fastify como framework HTTP
- Prisma para ORM
- MySQL como banco de dados
- Zod para validação de dados
- Docker & Docker Compose para conteinerização
- Swagger para documentação da API
- Arquitetura Hexagonal (Ports & Adapters)

---

## Recursos Implementados
- Cadastro e gerenciamento de clientes
- Identificação por CPF
- Gerenciamento de categorias de produtos
- Gerenciamento de produtos
- Criação e gerenciamento de pedidos
- Processamento de pagamentos
- API RESTful documentada
- Tratamento de erros padronizado
- Sistema de migração e seed de dados

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos:
- Docker + Docker Compose

### Passos:
1. Clone o repositório:
   ```bash
   git clone https://github.com/laahundskarl/fast-food.git
   cd fast-food
   ```

2. Configure as variáveis de ambiente:
   ```markdown
   cp .env.example .env
   ```

3. Suba a aplicação com o docker:
   ```markdown
   docker-compose up --build (ambiente dev)
   docker compose -f docker-compose.prod.yml up --build (ambiente de prod)
   ```

4. Acesse a API no endereço:
   ```markdown
   http://localhost:3000
   ```

5. A documentação Swagger está disponível em:
   ```markdown
   http://localhost:3000/docs
   ```

---

## 🗃️ Banco de Dados

O banco de dados utilizado é o MySQL. As entidades estão configuradas usando o TypeORM com migrations para versionamento do esquema do banco de dados.

Para executar manualmente as migrations:
```bash
    npm run prisma:generate
```

OBS: Apenas por via de testes, ambos os bancos do ambiente de prod e dev estão sendo populados com algumas informações
---

## API Endpoints

### Cliente

- POST /client - Criar cliente
- GET /client/:cpf - Obter cliente por CPF
- PUT /client/:cpf - Atualizar cliente
- DELETE /client/:cpf - Excluir cliente

### Identificação

- POST /identify - Identificar cliente por CPF

### Produto

- GET /product - Listar produtos
- GET /product/:id - Obter produto por ID
- POST /product - Criar produto
- PUT /product/:id - Atualizar produto
- DELETE /product/:id - Excluir produto

### Categoria de Produto

- GET /product-category - Listar categorias de produtos
- GET /product-category/:id - Obter categoria por ID

### Pedidos

- GET /order - Listar pedidos
- GET /order/:id - Obter pedido por ID
- POST /order - Criar pedido
- PUT /order/:id - Atualizar pedido
- DELETE /order/:id - Excluir pedido

---

## 🧑‍💻 Contribuidores

- Grupo 277 — Tech Challenge
    - RM 361923 - Leonardo Andreas - GitHub - laahundskarl - Discord - leooandreas
    - RM 361899 - Gabriel Gomes - GitHub - gabrielgsd1 - Discord - gabrielgsd
    - RM 364043 - Willian Borba - GitHub - WillianBorba - Discord - willianrocha
    - RM 362223 - Fabio Smaniotto - GitHub - fabiosb - Discord - ofabiosb

