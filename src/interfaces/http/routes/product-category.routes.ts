import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/di/types';
import { ProductCategoryController } from '#/interfaces/controller/product-category.controller';
import { productCategoryGetSchema, productCategoryListSchema } from '#/interfaces/http/docs/product-category.docs';

export function productCategoryRoutes(app: FastifyInstance) {
    const controller = app.container.get<ProductCategoryController>(TYPES.ProductCategoryController);

    app.get('/:id', productCategoryGetSchema, controller.get.bind(controller));
    app.get('/', productCategoryListSchema, controller.list.bind(controller));
}
