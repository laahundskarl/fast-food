import { FastifyInstance } from 'fastify';

import { globalPrismaClient } from '#/database/prisma';
import { PaymentController } from '#/infrastructure/adapters/controller/payment.controller';
import { PrismaPaymentRepository } from '#/infrastructure/persistence/prisma/prisma-payment.repository';

export const paymentRoute = (app: FastifyInstance) => {
    const controller = new PaymentController(new PrismaPaymentRepository(globalPrismaClient));
    app.get('/', controller.list.bind(controller));
    app.patch('/:id', controller.update.bind(controller));
    app.get('/:id', controller.findById.bind(controller));
};
