import { Container } from 'inversify';

import { IClientRepository } from '#/domain/repositories/client.repository';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/di/types';
import { PrismaClientRepository } from '#/infrastructure/repositories/prisma/prisma-client.repository';
import { PrismaOrderRepository } from '#/infrastructure/repositories/prisma/prisma-order.repository';
import { PrismaPaymentRepository } from '#/infrastructure/repositories/prisma/prisma-payment.repository';
import { PrismaProductCategoryRepository } from '#/infrastructure/repositories/prisma/prisma-product-category.repository';
import { PrismaProductRepository } from '#/infrastructure/repositories/prisma/prisma-product.repository';

export function bindRepositories(container: Container) {
    container.bind<IClientRepository>(TYPES.ClientRepository).to(PrismaClientRepository).inSingletonScope();
    container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
    container.bind<IPaymentRepository>(TYPES.PaymentRepository).to(PrismaPaymentRepository).inSingletonScope();
    container
        .bind<IProductCategoryRepository>(TYPES.ProductCategoryRepository)
        .to(PrismaProductCategoryRepository)
        .inSingletonScope();
    container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();
}
