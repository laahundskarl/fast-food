import { FastifyInstance } from 'fastify';

import { ProductCategoryController } from '#/infrastructure/adapters/controller/product-category.controller';
import { productCategoryListSchema } from '#/interfaces/http/routes/schema/product-category.schema';

export function productCategoryRoutes(app: FastifyInstance) {
    const controller = new ProductCategoryController();

    app.get('/', productCategoryListSchema, controller.list.bind(controller));
    app.get('/:id', controller.get.bind(controller));
}
