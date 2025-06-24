import { FastifyInstance } from 'fastify';

import { ProductCategoryController } from '#/api/controllers/product-category.controller';
import { globalPrismaClient } from '#/database/prisma';
import { productCategoryGetSchema, productCategoryListSchema } from '#/docs/product-category.docs';
import { PrismaProductCategoryRepository } from '#/repositories/prisma/prisma-product-category.repository';

export function productCategoryRoutes(app: FastifyInstance) {
    const repository = new PrismaProductCategoryRepository(globalPrismaClient);
    const controller = new ProductCategoryController(repository);
    app.get('/:id', productCategoryGetSchema, controller.get.bind(controller));
    app.get('/', productCategoryListSchema, controller.list.bind(controller));
}
