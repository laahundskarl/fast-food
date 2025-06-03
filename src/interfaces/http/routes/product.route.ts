import { FastifyInstance } from 'fastify';

import { ProductController } from '#/infrastructure/adapters/controller/product.controller';
import {
    productCreateSchema,
    productDeleteSchema,
    productGetSchema,
    productListSchema,
    productUpdateSchema,
} from '#/interfaces/http/docs/product.docs';

export const productRoute = (app: FastifyInstance) => {
    const controller = new ProductController();
    app.post('/', productCreateSchema, controller.create.bind(controller));
    app.get('/:id', productGetSchema, controller.get.bind(controller));
    app.get('/', productListSchema, controller.list.bind(controller));
    app.patch('/:id', productUpdateSchema, controller.update.bind(controller));
    app.delete('/:id', productDeleteSchema, controller.destroy.bind(controller));
};
