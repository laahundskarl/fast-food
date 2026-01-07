import { Container } from 'inversify';

import { TYPES } from '#/infrastructure/config/di/types';
import { ClientController } from '#/interfaces/controller/client.controller';
import { ProductCategoryController } from '#/interfaces/controller/product-category.controller';
import { ProductController } from '#/interfaces/controller/product.controller';

export function bindControllers(container: Container) {
    container.bind<ClientController>(TYPES.ClientController).to(ClientController).inTransientScope();
    container
        .bind<ProductCategoryController>(TYPES.ProductCategoryController)
        .to(ProductCategoryController)
        .inTransientScope();
    container.bind<ProductController>(TYPES.ProductController).to(ProductController).inTransientScope();
}
