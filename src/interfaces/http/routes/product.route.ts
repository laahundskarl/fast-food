import { FastifyInstance } from 'fastify';

import { ProductController } from '#/infrastructure/adapters/controller/product.controller';
import {
    productCreateSchema,
    productDeleteSchema,
    productListSchema,
    productUpdateSchema,
} from '#/interfaces/http/routes/schema/product.schema';

export const productRoute = (app: FastifyInstance) => {
    const controller = new ProductController();

    app.get('/', productListSchema, async (request, reply) => {
        return controller.list(request, reply);
    });

    app.get('/:id', async (request, reply) => {
        return controller.get(request, reply);
    });

    app.post('/', productCreateSchema, async (request, reply) => {
        return controller.create(request, reply);
    });

    app.put('/:id', productUpdateSchema, async (request, reply) => {
        return controller.update(request, reply);
    });

    app.delete('/:id', productDeleteSchema, async (request, reply) => {
        return controller.destroy(request, reply);
    });
};
