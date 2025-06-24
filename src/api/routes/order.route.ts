import { FastifyInstance } from 'fastify';

import { OrderController } from '#/api/controllers/order.controller';
import { globalPrismaClient } from '#/database/prisma';
import {
    orderCreateSchema,
    orderDeleteSchema,
    orderGetSchema,
    orderListSchema,
    orderUpdateSchema,
} from '#/docs/order.docs';
import { PrismaOrderRepository } from '#/repositories/prisma/prisma-order.repository';
import { PrismaProductRepository } from '#/repositories/prisma/prisma-product.repository';

export const orderRoute = (app: FastifyInstance) => {
    const orderRepository = new PrismaOrderRepository(globalPrismaClient);
    const productRepository = new PrismaProductRepository(globalPrismaClient);
    const controller = new OrderController(orderRepository, productRepository);
    app.post('/', orderCreateSchema, controller.create.bind(controller));
    app.get('/:id', orderGetSchema, controller.get.bind(controller));
    app.get('/', orderListSchema, controller.list.bind(controller));
    app.patch('/:id', orderUpdateSchema, controller.update.bind(controller));
    app.delete('/:id', orderDeleteSchema, controller.destroy.bind(controller));
};
