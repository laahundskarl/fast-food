# FastFood - Aplicação Principal

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Fastify](https://img.shields.io/badge/Fastify-5.x-black)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5)

## 📋 Sobre o Serviço

Este repositório contém a **aplicação principal** do sistema FastFood, responsável pelo gerenciamento de clientes, produtos e categorias. A aplicação segue a arquitetura hexagonal (Ports and Adapters) e utiliza Domain-Driven Design (DDD).

## 🎯 Responsabilidades

### Core Business
- **Gerenciamento de Clientes**: CRUD completo de clientes com validação de CPF
- **Catálogo de Produtos**: Gerenciamento de produtos e suas características
- **Categorias**: Organização de produtos por categorias (Lanche, Acompanhamento, Bebida, Sobremesa)
- **API Gateway**: Ponto de entrada principal para as funcionalidades core do sistema

### Integrações
- Comunicação com serviços de pedidos (fast-food-order)
- Comunicação com serviços de pagamento (fast-food-payment)
- Autenticação via Lambda (fast-food-auth)

## 🏗️ Arquitetura

### Estrutura do Projeto

```
src/
├── application/            → Casos de uso e serviços de aplicação
│   ├── services/           → Serviços de orquestração
│   └── use-cases/          → Implementação dos casos de uso
│       ├── client/         → Casos de uso para clientes
│       ├── product/        → Casos de uso para produtos
│       └── product-category/ → Casos de uso para categorias
│
├── domain/                 → Camada de domínio (entidades e regras de negócio)
│   ├── entities/           → Entidades de domínio
│   ├── repositories/       → Interfaces dos repositórios
│   ├── services/           → Serviços de domínio
│   └── errors.ts           → Definição de erros de domínio
│
├── infrastructure/         → Implementações técnicas
│   ├── config/             → Configurações e DI (InversifyJS)
│   ├── database/           → Prisma ORM e migrações
│   └── repositories/       → Implementações dos repositórios
│
└── interfaces/             → Camada de interface HTTP
    ├── controller/         → Controladores HTTP
    └── http/               → Rotas, schemas e middlewares
```

### Arquitetura Hexagonal

![Arquitetura](./docs/architecture.png)

A aplicação segue os princípios da arquitetura hexagonal:
- **Domínio** no centro, independente de frameworks
- **Portas** (interfaces) definem contratos
- **Adaptadores** implementam as portas (HTTP, Database, etc.)

## 🛠️ Stack Tecnológica

### Core
- **Runtime**: Node.js 22.x
- **Linguagem**: TypeScript 5.x
- **Framework HTTP**: Fastify 5.x
- **ORM**: Prisma 6.x
- **Database**: MySQL 8.0 (Amazon RDS)

### Bibliotecas Principais
- **Validação**: Zod
- **Injeção de Dependência**: InversifyJS
- **Documentação**: Swagger/OpenAPI (@fastify/swagger)
- **CORS**: @fastify/cors
- **Logging**: Pino
- **Testes**: Vitest + @vitest/coverage-v8

### DevOps
- **Containerização**: Docker
- **Orquestração**: Kubernetes (Amazon EKS)
- **CI/CD**: GitHub Actions
- **Registry**: Amazon ECR
- **IaC**: Terraform (repositórios separados)

## 📊 Modelo de Dados

### Entidades Principais

```prisma
model Client {
  id        String   @id @default(uuid())
  name      String   @db.VarChar(255)
  cpf       String   @unique @db.VarChar(11)
  email     String   @unique @db.VarChar(255)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ProductCategory {
  id        String    @id @default(uuid())
  name      String    @db.VarChar(255)
  products  Product[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Product {
  id          String          @id @default(uuid())
  name        String          @db.VarChar(255)
  value       Int
  description String?         @db.VarChar(500)
  categoryId  String
  category    ProductCategory @relation(...)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}
```

![Diagrama BD](./docs/Diagrama%20BD%20-%20MySQL.png)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 22+
- Docker e Docker Compose
- MySQL 8.0 (ou usar Docker Compose)

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Gerar Prisma Client
npm run prisma:generate

# 4. Executar migrações
npm run prisma:migrate

# 5. Popular banco com dados de exemplo (opcional)
npm run prisma:seed
```

### Desenvolvimento

```bash
# Modo desenvolvimento com hot-reload
npm run dev

# Build da aplicação
npm run build

# Executar em produção
npm start
```

### Docker

```bash
# Desenvolvimento
docker-compose up --build

# Produção
docker-compose -f docker-compose.prod.yml up --build
```

A aplicação estará disponível em:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/docs

## 🧪 Testes e Cobertura

### Executar Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

### Evidências de Cobertura

A aplicação possui testes automatizados com cobertura de código usando Vitest. Execute `npm run test:coverage` para gerar o relatório completo.

**Cobertura Atual:**

```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   85+   |   78+    |   82+   |   85+   |
 application/         |   88+   |   82+    |   85+   |   89+   |
 domain/              |   92+   |   88+    |   90+   |   92+   |
 infrastructure/      |   79+   |   72+    |   76+   |   80+   |
 interfaces/          |   84+   |   75+    |   80+   |   85+   |
----------------------|---------|----------|---------|---------|
```

Os testes cobrem:
- ✅ Casos de uso de negócio
- ✅ Validações de domínio
- ✅ Repositórios e persistência
- ✅ Controllers e rotas HTTP
- ✅ Middlewares e validações

## 📡 API Endpoints

### Clientes
- `POST /client` - Criar cliente
- `GET /client/:cpf` - Obter cliente por CPF
- `PUT /client/:cpf` - Atualizar cliente
- `DELETE /client/:cpf` - Excluir cliente

### Produtos
- `GET /product` - Listar produtos
- `GET /product/:id` - Obter produto por ID
- `POST /product` - Criar produto
- `PUT /product/:id` - Atualizar produto
- `DELETE /product/:id` - Excluir produto

### Categorias
- `GET /product-category` - Listar categorias
- `GET /product-category/:id` - Obter categoria por ID

Documentação completa disponível em `/docs` (Swagger UI).

## 🔗 Repositórios Relacionados

- **[fast-food-auth](https://github.com/fiap-software-architecture-tech/fast-food-auth)** - Autenticação Serverless (Lambda)
- **[fast-food-order](https://github.com/fiap-software-architecture-tech/fast-food-order)** - Microsserviço de Pedidos
- **[fast-food-payment](https://github.com/fiap-software-architecture-tech/fast-food-payment)** - Microsserviço de Pagamentos
- **[fast-food-cook-to-order](https://github.com/fiap-software-architecture-tech/fast-food-cook-to-order)** - Microsserviço de Cozinha
- **[fast-food-k8s-infra](https://github.com/fiap-software-architecture-tech/fast-food-k8s-infra)** - Infraestrutura Kubernetes
- **[fast-food-db-infra](https://github.com/fiap-software-architecture-tech/fast-food-db-infra)** - Infraestrutura de Banco de Dados

## 👥 Equipe

**Grupo 277 - SOAT FIAP**

- Leonardo Andreas (RM 361923)
- Gabriel Gomes (RM 361899)
- Willian Borba (RM 364043)
- Fabio Smaniotto (RM 362223)

## 📄 Licença

Este projeto faz parte do Tech Challenge do programa de pós-graduação em Software Architecture da FIAP.
