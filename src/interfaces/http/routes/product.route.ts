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
    app.post('/', productCreateSchema, controller.create.bind(controller));
    app.get('/:id', controller.get.bind(controller));
    app.get('/', productListSchema, controller.list.bind(controller));
    app.patch('/:id', productUpdateSchema, controller.update.bind(controller));
    app.delete('/:id', productDeleteSchema, controller.destroy.bind(controller));
};
