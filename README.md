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

## Vídeo
[Disponível no Google Drive](https://drive.google.com/file/d/1g7Sn-VOfrwDRkErXO3EoisZLAg4psrhD/view)

## 🧑‍💻 Contribuidores

- Grupo 277 — Tech Challenge
    - RM 361923 - Leonardo Andreas - GitHub - laahundskarl - Discord - leooandreas
    - RM 361899 - Gabriel Gomes - GitHub - gabrielgsd1 - Discord - gabrielgsd
    - RM 364043 - Willian Borba - GitHub - WillianBorba - Discord - willianrocha
    - RM 362223 - Fabio Smaniotto - GitHub - fabiosb - Discord - ofabiosb

---

## 🚀 Deploy na AWS com Terraform e Kubernetes

### Pré-requisitos

1. **AWS CLI configurado**
2. **Terraform >= 1.0 instalado**
3. **kubectl instalado**
4. **Docker instalado**
5. **Conta AWS com permissões para criar EKS, ECR, VPC, etc.**

### Passo 1: Configurar Credenciais AWS

#### AWS Academy:
```bash
# Baixar as credenciais do AWS Academy
# Criar arquivo ~/.aws/credentials
[default]
aws_access_key_id=YOUR_ACCESS_KEY
aws_secret_access_key=YOUR_SECRET_KEY
aws_session_token=YOUR_SESSION_TOKEN
region=us-east-1
```

#### AWS CLI padrão:
```bash
aws configure
# Inserir: Access Key, Secret Key, Region (us-east-1), Output format (json)
```

### Passo 2: Preparar Infraestrutura com Terraform

```bash
# 1. Navegar para o diretório terraform
cd terraform/

# 2. Inicializar Terraform
terraform init

# 3. Validar configuração
terraform validate

# 4. Planejar deploy (revisar recursos que serão criados)
terraform plan

# 5. Aplicar infraestrutura
terraform apply
# Digite 'yes' quando solicitado

# 6. Obter informações do cluster
terraform output
```

### Passo 3: Configurar kubectl

```bash
# Configurar kubectl para usar o cluster EKS
aws eks update-kubeconfig --region us-east-1 --name fast-food-cluster-prd

# Verificar conectividade
kubectl get nodes
```

### Passo 4: Build e Push da Imagem Docker

```bash
# 1. Obter URL do ECR repository
ECR_URI=$(terraform output -raw ecr_repository_url)

# 2. Login no ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URI

# 3. Build da imagem
docker build -t fastfood-api .

# 4. Tag da imagem
docker tag fastfood-api:latest $ECR_URI:latest

# 5. Push para ECR
docker push $ECR_URI:latest
```

### Passo 5: Deploy da Aplicação no Kubernetes

```bash
# 1. Navegar para diretório k8s
cd ../k8s/

# 2. Aplicar configurações e secrets
kubectl apply -f 01-config.yaml

# 3. Aplicar PVC para MySQL
kubectl apply -f 02-mysql-pvc.yaml

# 4. Deploy MySQL
kubectl apply -f 03-mysql-deployment.yaml
kubectl apply -f 04-mysql-service.yaml

# 5. Aguardar MySQL estar pronto
kubectl wait --for=condition=Ready pod -l app=mysql --timeout=300s

# 6. Deploy da API
kubectl apply -f 05-api-deployment.yaml
kubectl apply -f 06-api-service.yaml

# 7. Aplicar LoadBalancer (acesso externo)
kubectl apply -f 07-loadbalancer.yaml
```

### Passo 6: Verificar Deploy

```bash
# Verificar pods
kubectl get pods

# Verificar serviços
kubectl get svc

# Obter URL externa do LoadBalancer
kubectl get svc fastfood-loadbalancer

# Ver logs da aplicação
kubectl logs -l app=fastfood-api -f

# Ver logs do MySQL
kubectl logs -l app=mysql
```

### Passo 7: Testar a Aplicação

```bash
# Port-forward para teste local (opcional)
kubectl port-forward svc/fastfood-api-service 8080:3000

# Acessar Swagger (se usando port-forward)
# http://localhost:8080/docs

# Ou usar o LoadBalancer External IP
EXTERNAL_IP=$(kubectl get svc fastfood-loadbalancer -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "API disponível em: http://$EXTERNAL_IP/docs"
```

### Troubleshooting

#### Verificar status dos pods:
```bash
kubectl get pods -o wide
kubectl describe pod <pod-name>
kubectl logs <pod-name> -c <container-name>
```

#### Verificar conectividade MySQL:
```bash
kubectl run mysql-test --image=mysql:8 --rm -it --restart=Never -- mysql -h mysql-service -u admin -padmin123 -e "SELECT 1"
```

#### Verificar EBS CSI Driver:
```bash
kubectl get pods -n kube-system | grep ebs-csi
```

### Limpeza de Recursos

⚠️ **IMPORTANTE**: Para evitar custos desnecessários, sempre destrua os recursos após os testes:

```bash
# 1. Remover aplicação Kubernetes
kubectl delete -f k8s/

# 2. Destruir infraestrutura Terraform
cd terraform/
terraform destroy
# Digite 'yes' quando solicitado

# 3. Verificar se todos os recursos foram removidos
terraform show
```

### Arquitetura do Deploy

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   LoadBalancer  │────│  FastFood API   │────│     MySQL       │
│   (AWS ELB)     │    │   (2 replicas)  │    │  (Persistent)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                │                       │
                          ┌─────────────────┐    ┌─────────────────┐
                          │   Kubernetes    │    │   EBS Volume    │
                          │   (AWS EKS)     │    │  (gp2 storage)  │
                          └─────────────────┘    └─────────────────┘
```

### Recursos AWS Utilizados

- **EKS Cluster**: Kubernetes gerenciado
- **ECR Repository**: Registry de imagens Docker
- **EBS CSI Driver**: Volumes persistentes
- **VPC + Subnets**: Rede isolada
- **IAM Roles**: Permissões de acesso
- **Security Groups**: Firewall
- **Load Balancer**: Acesso externo
