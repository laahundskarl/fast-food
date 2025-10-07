# GitHub Actions Workflow Naming Conventions

Este documento descreve as convenções de nomenclatura implementadas para os workflows do projeto FastFood.

## Convenções Implementadas

### Prefixos Padrão

As workflows seguem prefixos padronizados que indicam claramente o propósito:

- **`CI -`** Continuous Integration (Integração Contínua)
- **`CD -`** Continuous Deployment (Entrega Contínua)
- **`Infrastructure -`** Operações de infraestrutura
- **`Cleanup -`** Limpeza e destruição de recursos
- **`E2E -`** Testes End-to-End

### Estrutura por Repositório

#### 📦 fast-food (Aplicação Principal)
```
✅ CI - Build and Test
✅ CD - Build and Deploy
✅ Cleanup - Application and Infrastructure
✅ E2E - End-to-End Testing Pipeline
```

#### 🗄️ fast-food-db-infra (Infraestrutura de Banco)
```
✅ Infrastructure - Validate Database
✅ Infrastructure - Deploy Database
✅ Cleanup - Destroy Database
```

#### ☸️ fast-food-k8s-infra (Infraestrutura Kubernetes)
```
✅ Infrastructure - Validate Kubernetes
✅ Infrastructure - Deploy Kubernetes
✅ Cleanup - Destroy Kubernetes
✅ CD - Deploy Application
```

## Benefícios das Convenções

### 🔍 **Identificação Rápida**
- Fácil identificação do propósito da workflow no GitHub Actions
- Agrupamento visual por tipo de operação
- Redução de confusão entre workflows similares

### 📊 **Organização Clara**
- Workflows ordenadas alfabeticamente por categoria
- Separação clara entre CI/CD e operações de infraestrutura
- Facilita navegação em projetos com muitas workflows

### 🔧 **Manutenção Simplificada**
- Padrão consistente facilita criação de novas workflows
- Reduz erros de nomenclatura
- Melhora documentação automática

## Pipeline End-to-End

### 🚀 **Nova Workflow E2E**

Criamos uma workflow abrangente de testes end-to-end:

```yaml
name: 'E2E - End-to-End Testing Pipeline'
```

#### Características:

- **🏗️ Setup Automático**: Deploy completo da infraestrutura
- **🧪 Testes Abrangentes**: 4 suítes de teste (clientes, pedidos, pagamentos, admin)
- **🔒 Verificação de Segurança**: Auditoria e testes de segurança
- **📊 Relatórios Detalhados**: Artefatos e métricas de performance
- **🧹 Cleanup Automático**: Destruição automática dos recursos

#### Execução:
- **Manual**: Via `workflow_dispatch` com parâmetros configuráveis
- **Agendada**: Diariamente às 2h UTC
- **Timeout**: Configurável (padrão 30 minutos)

## Vantagens do Sistema

### 💰 **Economia de Custos**
- Limpeza automática de recursos de teste
- Prevenção de custos desnecessários na AWS
- Workflows de cleanup manual disponíveis

### 🛡️ **Segurança**
- Ambientes de teste isolados
- Validação de segurança automatizada
- Tokens e permissões adequadas

### 📈 **Qualidade**
- Testes automatizados antes do deploy
- Validação de performance
- Relatórios de cobertura

### 🔄 **DevOps Maduro**
- Pipeline completo de CI/CD
- Infraestrutura como código
- Monitoramento e alertas

## Scripts de Teste Local

### 📝 **Novos Scripts NPM**
```bash
npm run test:e2e:local    # Runner completo local
npm run test:e2e          # Todos os testes
npm run test:e2e:clients  # Testes de clientes
npm run test:e2e:orders   # Testes de pedidos
npm run test:e2e:payments # Testes de pagamento
npm run test:e2e:admin    # Testes administrativos
npm run test:postman      # Collection Postman
```

### 🧪 **Estrutura de Testes**
```
tests/e2e/
├── client-tests.js     # Gestão de clientes
├── order-tests.js      # Workflow de pedidos
├── payment-tests.js    # Integração de pagamentos
├── admin-tests.js      # Operações administrativas
└── run-local.js        # Runner local completo
```

## Próximos Passos

### 🔄 **Melhorias Futuras**
1. **Notificações**: Slack/Teams para resultados
2. **Métricas**: Dashboards de performance
3. **Alertas**: Monitoramento proativo
4. **Rollback**: Automatização de reversões

### 📚 **Documentação**
1. Playbooks de troubleshooting
2. Guias de contribuição
3. Documentação de API atualizada

---

## Compliance com Boas Práticas

✅ **Nomenclatura Consistente**: Prefixos padronizados
✅ **Separação de Responsabilidades**: Workflows focadas
✅ **Automação Completa**: CI/CD end-to-end
✅ **Gestão de Custos**: Cleanup automático
✅ **Segurança**: Validações e isolamento
✅ **Monitoramento**: Relatórios e métricas
✅ **Documentação**: Guides e convenções

Este sistema de workflows representa um pipeline maduro de DevOps, seguindo as melhores práticas da indústria e otimizado para desenvolvimento ágil e econômico.