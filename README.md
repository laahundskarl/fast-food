# FastFood Autoatendimento - Tech Challenge (Grupo 277)

Este projeto é a implementação de um sistema backend para uma lanchonete com autoatendimento, utilizando TypeScript, Fastify, PrismaORM e MySQL, seguindo a arquitetura hexagonal (também conhecida como Ports and Adapters).

---

## Arquitetura da Solução

![Arquitetura FastFood](./docs/architecture.png)

### Requisitos de Negócio

A solução resolve os seguintes problemas de negócio:

- **Gerenciamento de filas:** O sistema de autoatendimento reduz o tempo de espera dos clientes
- **Pedidos customizados:** Permite que clientes montem seus pedidos com facilidade
- **Rastreamento de pedidos:** Clientes podem acompanhar o status de preparação
- **Identificação simplificada:** Processo simples de identificação por CPF
- **Fidelização:** Registro de clientes para programas de fidelidade
- **Gestão de estoque:** Controle de produtos disponíveis em tempo real

### Requisitos de Infraestrutura

A arquitetura implementa:

- **Escalabilidade horizontal:** Uso de HPA (Horizontal Pod Autoscaler) para lidar com picos de demanda nos horários de maior movimento, garantindo que o totem não fique lento
- **Alta disponibilidade:** Múltiplas réplicas do serviço em diferentes zonas de disponibilidade
- **Persistência de dados:** Amazon RDS MySQL gerenciado
- **Balanceamento de carga:** LoadBalancer para distribuir requisições
- **Segurança:** Configurações de segurança e secrets no Kubernetes
- **Monitoramento:** Metrics Server para coleta de métricas de utilização
- **Infraestrutura como código:** Terraform para provisionamento da infraestrutura na AWS
- **Containerização:** Docker para empacotamento da aplicação
- **Orquestração:** Kubernetes para gerenciamento de containers e recursos

---

## Estrutura do Projeto

```markdown
api/                        → Coleções Postman para testes dos endpoints
docs/                       → Informações do Event Storming
k8s/                        → Configurações Kubernetes para deploy
│   ├── 01-api-service.yaml → Serviço da API
│   ├── 02-loadbalancer.yaml → LoadBalancer para acesso externo
│   ├── 03-config.yaml      → Configurações e secrets para K8s
│   ├── 04-api-deployment.yaml → Deployment da API
│   ├── 05-hpa.yaml         → Horizontal Pod Autoscaler
│   └── deploy.sh           → Script de deploy automatizado
│
terraform/                  → Infraestrutura como código para AWS
│   ├── data.tf             → Data sources para recursos AWS
│   ├── ecr.tf              → Configuração do ECR
│   ├── eks.tf              → Configuração do EKS
│   ├── outputs.tf          → Outputs do Terraform
│   ├── providers.tf        → Providers da AWS
│   ├── rds.tf              → Configuração do RDS MySQL
│   ├── variables.tf        → Variáveis do Terraform
│   └── vpc.tf              → Configuração da VPC
src/
├── application/            → Camada de aplicação (casos de uso)
│   ├── services/           → Serviços de orquestração
│   └── use-cases/          → Implementação dos casos de uso
│       ├── client/         → Casos de uso para clientes
│       ├── identify/       → Casos de uso para identificação
│       ├── order/          → Casos de uso para pedidos
│       ├── payment/        → Casos de uso para pagamentos
│       ├── product/        → Casos de uso para produtos
│       ├── product-category/ → Casos de uso para categorias
│       └── webhook/        → Casos de uso para webhooks
│
├── domain/                 → Camada de domínio (entidades e regras de negócio)
│   ├── entities/           → Entidades de domínio
│   ├── gateways/           → Interfaces para serviços externos
│   ├── repositories/       → Interfaces dos repositórios
│   ├── services/           → Serviços de domínio
│   └── errors.ts           → Definição de erros de domínio
│
├── infrastructure/         → Camada de infraestrutura (implementações concretas)
├── infrastructure/         → Camada de infraestrutura (implementações concretas)
│   ├── config/             → Configurações da aplicação
│   │   ├── container.ts    → Container de injeção de dependência
│   │   ├── env.ts          → Configurações de ambiente
│   │   ├── logger.ts       → Configuração de logs
│   │   └── types.ts        → Tipos para DI
│   ├── database/           → Configurações do banco de dados
│   │   └── prisma/         → Esquemas, migrações e seeds do Prisma
│   │       ├── migrations/ → Migrações do banco
│   │       ├── seeds/      → Scripts para popular o banco
│   ├── gateways/           → Implementações de gateways externos
│   │   └── mercado-pago/   → Gateway do Mercado Pago
│   ├── repositories/       → Implementações dos repositórios
│   │   └── prisma/         → Repositórios usando Prisma
│   │       └── mappers/    → Mapeadores entre domínio e persistência
│   └──  server/             → Configuração do servidor
│
├── interfaces/             → Camada de interface (controllers e HTTP)
│   ├── controller/         → Controladores HTTP
│   └── http/               → Configuração HTTP
│       ├── docs/           → Documentação Swagger
│       ├── middlewares/    → Middlewares HTTP
│       ├── routes/         → Definição das rotas
│       ├── schema/         → Esquemas de validação
│       └── validator/      → Validadores customizados
│
└── index.ts                → Ponto de entrada da aplicação

# Arquivos de Configuração na Raiz:
.editorconfig               → Configuração do editor
.env                        → Variáveis de ambiente
.env.example                → Exemplo de variáveis de ambiente
.gitignore                  → Arquivos ignorados pelo Git
.prettierignore             → Arquivos ignorados pelo Prettier
.prettierrc                 → Configuração do Prettier
docker-compose.prod.yml     → Configuração Docker para produção
docker-compose.yml          → Configuração Docker para desenvolvimento
Dockerfile                  → Instruções para build da imagem Docker
eslint.config.mjs           → Configuração do ESLint
package.json                → Dependências e scripts do projeto
tsconfig.json               → Configuração do TypeScript
tsup.config.ts              → Configuração do bundler TSup
wait-for.sh                 → Script para aguardar serviços
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
- Amazon RDS MySQL como banco de dados
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

O banco de dados utilizado é o **Amazon RDS MySQL**, um serviço gerenciado que oferece alta disponibilidade, backups automáticos e escalabilidade. As entidades estão configuradas usando o Prisma ORM com migrations para versionamento do esquema do banco de dados.

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

## Vídeo Fase 1 - Tech Challenge
[Disponível no Google Drive](https://drive.google.com/file/d/1g7Sn-VOfrwDRkErXO3EoisZLAg4psrhD/view)

## Vídeo Fase 2 - Tech Challenge
[Disponível no Google Drive](https://drive.google.com/file/d/1I3kuTuB8rHYfieVRkhryJwcm9AV9dKFI/view?usp=sharing)

## 🧑‍💻 Contribuidores

- Grupo 173 — Tech Challenge
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

# 7. Se não houver outputs, execute um refresh
terraform refresh
terraform output
```

### Passo 3: Build e Push da Imagem Docker

```bash
# Usando terraform output
ECR_URI=$(terraform output -raw ecr_repository_url 2>/dev/null)

# Extrair hostname do registry
ECR_REGISTRY=$(echo "$ECR_URI" | cut -d'/' -f1)
echo "ECR_REGISTRY: $ECR_REGISTRY"

# Login no ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "$ECR_REGISTRY"

# volte para a pasta raíz
cd ..

# Build da imagem
docker build -t fastfood-api .

# Tag da imagem
docker tag fastfood-api:latest "$ECR_URI:latest"

# Push para ECR
docker push "$ECR_URI:latest"
```

### Passo 3: Deploy da Aplicação no Kubernetes

```bash
# 1. Navegar para diretório k8s
cd k8s/

# 2. Executar script de deploy (inclui configuração do kubectl e todos os passos)
chmod +x deploy.sh
./deploy.sh
```

**Observação:** O script `deploy.sh` agora inclui automaticamente a configuração do kubectl para o cluster EKS, então você não precisa executar o comando `aws eks update-kubeconfig` separadamente.

### Passo 4: Verificar Deploy

```bash
# Verificar pods
kubectl get pods

# Verificar serviços
kubectl get svc

# Obter URL externa do LoadBalancer
kubectl get svc fastfood-loadbalancer

# Verificar HPA (pode demorar alguns minutos para mostrar métricas)
kubectl get hpa

# Verificar métricas dos pods
kubectl top pods

# Verificar métricas dos nodes
kubectl top nodes

# Ver logs da aplicação
kubectl logs -l app=fastfood-api -f
```

### Passo 6: Testar a Aplicação

```bash
# Port-forward para teste local (opcional)
kubectl port-forward svc/fastfood-api-service 8080:3000

# Acessar Swagger (se usando port-forward)
# http://localhost:8080/docs

### Troubleshooting

#### Verificar status dos pods:
```bash
kubectl get pods -o wide
kubectl describe pod <pod-name>
kubectl logs <pod-name> -c <container-name>
```

#### ⚠️ Problema comum: Metrics Server timeout (HPA não funciona)
Se `kubectl top nodes` mostrar `<unknown>` ou logs do Metrics Server mostrarem "context deadline exceeded":

```bash
# 1. Verificar se o security group permite comunicação na porta 10250
kubectl logs -n kube-system -l k8s-app=metrics-server --tail=20

# 2. Se houver erros de timeout, corrigir security group:
    NODE_SG=$(aws ec2 describe-security-groups \
      --filters "Name=group-name,Values=*node*" "Name=tag:kubernetes.io/cluster/fast-food-cluster-prd,Values=*" \
      --query 'SecurityGroups[0].GroupId' \
      --output text)

# 3. Adicionar regra de saída para kubelet metrics
aws ec2 authorize-security-group-egress \
  --group-id "$NODE_SG" \
  --protocol tcp \
  --port 10250 \
  --source-group "$NODE_SG"

# 4. Aguardar 2-3 minutos e testar
kubectl top nodes
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
│   LoadBalancer  │────│  FastFood API   │────│   Amazon RDS    │
│   (AWS ELB)     │    │   (2 replicas)  │    │     MySQL       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                │                       │
                          ┌─────────────────┐    ┌─────────────────┐
                          │   Kubernetes    │    │  Managed MySQL  │
                          │   (AWS EKS)     │    │                 │
                          └─────────────────┘    └─────────────────┘
```

### Recursos AWS Utilizados

- **EKS Cluster**: Kubernetes gerenciado
- **ECR Repository**: Registry de imagens Docker
- **RDS MySQL**: Banco de dados gerenciado
- **VPC + Subnets**: Rede isolada
- **IAM Roles**: Permissões de acesso
- **Security Groups**: Firewall
- **Load Balancer**: Acesso externo

---

## Deploy Kubernetes (padrão)

O deploy do cluster pode ser feito de forma automatizada com o script abaixo (recomendado):

```bash
cd k8s
chmod +x deploy.sh
./deploy.sh
```

O script executa todos os passos de criação dos recursos Kubernetes na ordem correta.

---

## Deploy Kubernetes (manual - opcional)

Se preferir, você pode executar cada comando manualmente, conforme descrito abaixo:

```bash
# 1. Navegar para diretório k8s
cd k8s/

# 2. Aplicar serviço da API
kubectl apply -f 01-api-service.yaml

# 3. Aplicar LoadBalancer (acesso externo)
kubectl apply -f 02-loadbalancer.yaml

# 4. Aplicar configurações e secrets
kubectl apply -f 03-config.yaml

# 5. Deploy da API (conecta automaticamente ao RDS)
kubectl apply -f 04-api-deployment.yaml

# 6. Instalar Metrics Server (necessário para HPA)
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 7. Aguardar Metrics Server estar pronto
kubectl wait --for=condition=Ready pod -l k8s-app=metrics-server -n kube-system --timeout=300s

# 8. Aplicar HPA (Horizontal Pod Autoscaler)
kubectl apply -f 05-hpa.yaml
```

> **Recomendação:** Use o `deploy.sh` para evitar erros de ordem ou comandos esquecidos.
