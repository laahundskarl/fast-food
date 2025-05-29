import { FastifyInstance } from 'fastify';

import { ProductCategoryController } from '#/infrastructure/adapters/controller/product-category.controller';
import { productCategoryListSchema } from '#/interfaces/http/routes/schema/product-category.schema';

export function productCategoryRoutes(app: FastifyInstance) {
    const controller = new ProductCategoryController();

    app.get('/', productCategoryListSchema, async (request, reply) => {
        return controller.list(request, reply);
    });
    app.get('/:id', async (request, reply) => {
        return controller.get(request, reply);
    });
}
