import { FastifyInstance } from 'fastify';

import { ProductCategoryController } from '#/infrastructure/adapters/controller/product-category.controller';
import { productCategoryGetSchema, productCategoryListSchema } from '#/interfaces/http/docs/product-category.docs';

export function productCategoryRoutes(app: FastifyInstance) {
    const controller = new ProductCategoryController();
    app.get('/:id', productCategoryGetSchema, controller.get.bind(controller));
    app.get('/', productCategoryListSchema, controller.list.bind(controller));
}
