import { FastifyInstance } from 'fastify';

import { ProductController } from '#/api/controllers/product.controller';
import { globalPrismaClient } from '#/database/prisma';
import {
    productCreateSchema,
    productDeleteSchema,
    productGetSchema,
    productListSchema,
    productUpdateSchema,
} from '#/docs/product.docs';
import { PrismaProductRepository } from '#/repositories/prisma/prisma-product.repository';

export const productRoute = (app: FastifyInstance) => {
    const repository = new PrismaProductRepository(globalPrismaClient);
    const controller = new ProductController(repository);
    app.post('/', productCreateSchema, controller.create.bind(controller));
    app.get('/:id', productGetSchema, controller.get.bind(controller));
    app.get('/', productListSchema, controller.list.bind(controller));
    app.patch('/:id', productUpdateSchema, controller.update.bind(controller));
    app.delete('/:id', productDeleteSchema, controller.destroy.bind(controller));
};
