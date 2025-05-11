# 🧾 FastFood Autoatendimento - Tech Challenge (Grupo 277)

Este projeto é a Fase 1 do Tech Challenge do curso SOAT, que consiste na implementação de um sistema **backend monolítico** para uma lanchonete com autoatendimento, utilizando **Node.js com NestJS**, **TypeORM** e **MySQL**, o projeto segue a **arquitetura hexagonal** (também conhecida como Ports and Adapters), organizada da seguinte forma:

---

## 📦 Estrutura do Projeto

```markdown
api/                          → Coleções Postman para testes dos endpoints  
src/  
├── core/  
│   ├── application/  
│   │   ├── ports/            → Interfaces que definem os contratos para adaptadores externos  
│   │   └── usecases/         → Implementações dos casos de uso da aplicação  
│   └── domain/  
│       ├── entities/         → Entidades do domínio com TypeORM  
│       └── repositories/     → Interfaces dos repositórios  
├── infrastructure/  
│   ├── adapters/             → Implementações de adaptadores para interagir com o mundo externo  
│   │   ├── controllers/      → Controladores HTTP  
│   │   └── dtos/             → Objetos de Transferência de Dados  
│   ├── config/               → Configurações (ex: TypeORM, módulos)  
│   └── persistence/          → Implementações com banco de dados  
└── main.ts                   → Arquivo principal da aplicação  
```

---

## ✅ Tecnologias Utilizadas

- Node.js  
- NestJS  
- TypeORM  
- MySQL  
- Docker & Docker Compose  
- Arquitetura Hexagonal (Ports & Adapters)  

---

## 🧪 Casos de Uso da Fase 1

- Criar um pedido com itens  
- Consultar pedidos por ID  
- Listar todos os pedidos  
- Atualizar status do pedido  

---

## ⚙️ Como Rodar Localmente

Pré-requisitos:  
- Docker + Docker Compose  

Passos:  
1. Clone o repositório:  
   git clone incluir  
   cd fast-food

2. Suba a aplicação com Docker Compose:  
   docker-compose up --build  

3. Acesse a API no endereço:  
   http://localhost:3000  

---

## 🗃️ Banco de Dados

O banco de dados utilizado é o **MySQL**. As entidades estão configuradas com `synchronize: true` para facilitar o desenvolvimento (não recomendado para produção).

---

## 📌 Observações

- Essa versão cobre apenas a **Fase 1** do desafio, com foco em pedido e seus itens.  
- A estrutura já está preparada para expansão futura (ex: administrativo, pagamento).  

---

## 🧑‍💻 Contribuidores

- Grupo 277 — Tech Challenge SOAT

RM 361923 - Leonardo Andreas - GitHub - laahundskarl
