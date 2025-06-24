import { FastifyInstance } from 'fastify';

import { PaymentController } from '#/api/controllers/payment.controller';
import { globalPrismaClient } from '#/database/prisma';
import { paymentGetSchema, paymentListSchema, paymentUpdateSchema } from '#/docs/payment.docs';
import { PrismaOrderRepository } from '#/repositories/prisma/prisma-order.repository';
import { PrismaPaymentRepository } from '#/repositories/prisma/prisma-payment.repository';

export const paymentRoute = (app: FastifyInstance) => {
    const paymentRepository = new PrismaPaymentRepository(globalPrismaClient);
    const orderRepository = new PrismaOrderRepository(globalPrismaClient);
    const controller = new PaymentController(paymentRepository, orderRepository);
    app.get('/:id', paymentGetSchema, controller.findById.bind(controller));
    app.get('/', paymentListSchema, controller.list.bind(controller));
    app.patch('/:id', paymentUpdateSchema, controller.update.bind(controller));
};
