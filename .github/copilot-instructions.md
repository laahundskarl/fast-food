# FastFood Autoatendimento - AI Coding Instructions

## Architecture Overview

This is a TypeScript FastFood autoservice system using **Hexagonal Architecture (Ports & Adapters)** with strict layer separation:

- `domain/` - Business entities, services, and repository interfaces
- `application/` - Use cases and orchestration services
- `infrastructure/` - Database, external APIs, and configuration
- `interfaces/` - HTTP controllers, routes, and validation schemas

## Key Patterns & Conventions

### Dependency Injection
Uses **InversifyJS** with symbol-based injection. All dependencies are registered in `infrastructure/config/container.ts`:
```typescript
@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository
```

### Entity Design
Domain entities (e.g., `Order`, `Client`) contain business logic and validation. Example state transitions:
```typescript
// Order entity validates status transitions
updateStatus(newStatus: OrderStatus) {
    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.WAITING]: [OrderStatus.RECEIVED, OrderStatus.CANCELED],
        // ...
    }
}
```

### Use Case Pattern
Each feature follows strict use case structure with interface segregation:
```
application/use-cases/order/create-order/
├── create-order.dto.ts
├── create-order.use-case.ts  # Interface
└── create-order.ts          # Implementation
```

### Error Handling
Custom error hierarchy in `domain/errors.ts`:
- `BusinessError` - Business rule violations
- `NotFoundError` - Missing resources
- `ConflictError` - Data conflicts
- `PaymentExternalError` - External service failures

### Builder Services
Complex object creation uses dedicated builders in `domain/services/`:
- `OrderBuilderService` - Creates orders with products and validation
- `PaymentBuilderService` - Handles payment creation logic

## Development Workflow

### Database Operations
```bash
npm run prisma:migrate      # Apply migrations
npm run prisma:generate     # Generate client
npm run prisma:seed         # Populate with test data
```

### Local Development
```bash
docker-compose up --build                              # Dev environment
docker-compose -f docker-compose.prod.yml up --build  # Production environment
```

### Code Quality
- ESLint config in `eslint.config.mjs`
- Zod schemas for validation in `interfaces/http/schema/`
- Fastify with type-safe request/response handling

## Deployment Architecture

### AWS Infrastructure (Terraform)
- **EKS Cluster** with HPA scaling
- **ECR** for container registry
- **RDS MySQL** for persistence
- All configs in `terraform/` directory

### Kubernetes Resources
Located in `k8s/` with specific execution order:
```bash
cd k8s && chmod +x deploy.sh && ./deploy.sh  # Automated deployment
```

## Integration Points

### Payment Gateway
Mercado Pago integration via `infrastructure/gateways/mercado-pago/`:
- QR code generation for payments
- Webhook handling for payment status updates
- External reference tracking

### Data Flow Pattern
Request → Controller → Use Case → Domain Service → Repository → Database
- Controllers only handle HTTP concerns
- Use cases orchestrate business operations
- Domain services contain business logic
- Repositories abstract data persistence

## Testing & Validation
- Swagger docs auto-generated at `/docs`
- Postman collection in `api/Fast-Food.postman_collection.json`
- Type-safe schemas with Zod validation
- Error responses follow consistent structure

## Import Aliases
All imports use `#/` prefix for src paths:
```typescript
import { Order } from '#/domain/entities/order.entity';
import { TYPES } from '#/infrastructure/config/types';
```

When modifying this codebase:
1. Follow hexagonal boundaries - never import from inner layers to outer layers
2. Use dependency injection for all external dependencies
3. Add new use cases following the established folder structure
4. Validate inputs with Zod schemas in the interfaces layer
5. Handle errors using the custom error hierarchy
