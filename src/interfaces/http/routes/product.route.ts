import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/di/types';
import { ProductController } from '#/interfaces/controller/product.controller';
import {
    productCreateSchema,
    productDeleteSchema,
    productGetSchema,
    productListSchema,
    productUpdateSchema,
} from '#/interfaces/http/docs/product.docs';

export const productRoute = (app: FastifyInstance) => {
    const controller = app.container.get<ProductController>(TYPES.ProductController);

    app.post('/', productCreateSchema, controller.create.bind(controller));
    app.delete('/:id', productDeleteSchema, controller.delete.bind(controller));
    app.get('/:id', productGetSchema, controller.get.bind(controller));
    app.get('/', productListSchema, controller.list.bind(controller));
    app.patch('/:id', productUpdateSchema, controller.update.bind(controller));
};
