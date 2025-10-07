import { Container } from 'inversify';

import { TYPES } from '#/infrastructure/config/di/types';
import { ClientController } from '#/interfaces/controller/client.controller';
import { OrderController } from '#/interfaces/controller/order.controller';
import { PaymentController } from '#/interfaces/controller/payment.controller';
import { ProductCategoryController } from '#/interfaces/controller/product-category.controller';
import { ProductController } from '#/interfaces/controller/product.controller';
import { IClientController } from '#/interfaces/controller/types/client';
import { IOrderController } from '#/interfaces/controller/types/order';
import { IPaymentController } from '#/interfaces/controller/types/payment';
import { IProductController } from '#/interfaces/controller/types/product';
import { IProductCategoryController } from '#/interfaces/controller/types/product-category';

export function bindControllers(container: Container) {
    container.bind<IClientController>(TYPES.ClientController).to(ClientController).inTransientScope();
    container.bind<IOrderController>(TYPES.OrderController).to(OrderController).inTransientScope();
    container.bind<IPaymentController>(TYPES.PaymentController).to(PaymentController).inTransientScope();
    container
        .bind<IProductCategoryController>(TYPES.ProductCategoryController)
        .to(ProductCategoryController)
        .inTransientScope();
    container.bind<IProductController>(TYPES.ProductController).to(ProductController).inTransientScope();
}
