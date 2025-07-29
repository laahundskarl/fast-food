import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { CreateClient } from '#/application/use-cases/client/create-client/create-client';
import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { DeleteClient } from '#/application/use-cases/client/delete-client/delete-client';
import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { GetClient } from '#/application/use-cases/client/get-client/get-client';
import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { GetClientOrders } from '#/application/use-cases/client/get-client-orders/get-client-orders';
import { IGetClientOrdersUseCase } from '#/application/use-cases/client/get-client-orders/get-client-orders.use-case';
import { UpdateClient } from '#/application/use-cases/client/update-client/update-client';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/types';
import { ClientController } from '#/interfaces/controller/client.controller';
import { IdentifyController } from '#/interfaces/controller/identify.controller';
import { OrderController } from '#/interfaces/controller/order.controller';
import { PaymentController } from '#/interfaces/controller/payment.controller';
import { ProductCategoryController } from '#/interfaces/controller/product-category.controller';
import { ProductController } from '#/interfaces/controller/product.controller';
import { PrismaClientRepository } from '#/interfaces/repositories/prisma/prisma-client.repository';
import { PrismaOrderRepository } from '#/interfaces/repositories/prisma/prisma-order.repository';
import { PrismaPaymentRepository } from '#/interfaces/repositories/prisma/prisma-payment.repository';
import { PrismaProductCategoryRepository } from '#/interfaces/repositories/prisma/prisma-product-category.repository';
import { PrismaProductRepository } from '#/interfaces/repositories/prisma/prisma-product.repository';

const container = new Container();

// PrismaClient
container.bind<PrismaClient>(TYPES.PrismaClient).to(PrismaClient).inSingletonScope();

// Repositories
container.bind<IClientRepository>(TYPES.ClientRepository).to(PrismaClientRepository).inSingletonScope();
container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
container.bind<IPaymentRepository>(TYPES.PaymentRepository).to(PrismaPaymentRepository).inSingletonScope();
container
    .bind<IProductCategoryRepository>(TYPES.ProductCategoryRepository)
    .to(PrismaProductCategoryRepository)
    .inSingletonScope();
container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();

// Use Cases
container.bind<ICreateClientUseCase>(TYPES.CreateClientUseCase).to(CreateClient).inTransientScope();
container.bind<IDeleteClientUseCase>(TYPES.DeleteClientUseCase).to(DeleteClient).inTransientScope();
container.bind<IGetClientUseCase>(TYPES.GetClientUseCase).to(GetClient).inTransientScope();
container.bind<IGetClientOrdersUseCase>(TYPES.GetClientOrdersUseCase).to(GetClientOrders).inTransientScope();
container.bind<IUpdateClientUseCase>(TYPES.UpdateClientUseCase).to(UpdateClient).inTransientScope();

// Controllers
container.bind<ClientController>(TYPES.ClientController).to(ClientController).inTransientScope();
container.bind<IdentifyController>(TYPES.IdentifyController).to(IdentifyController).inTransientScope();
container.bind<OrderController>(TYPES.OrderController).to(OrderController).inTransientScope();
container.bind<PaymentController>(TYPES.PaymentController).to(PaymentController).inTransientScope();
container
    .bind<ProductCategoryController>(TYPES.ProductCategoryController)
    .to(ProductCategoryController)
    .inTransientScope();
container.bind<ProductController>(TYPES.ProductController).to(ProductController).inTransientScope();

export { container };
