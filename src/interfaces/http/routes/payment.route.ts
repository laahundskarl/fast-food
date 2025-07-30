import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/types';
import { PaymentController } from '#/interfaces/controller/payment.controller';
import { paymentGetSchema, paymentListSchema, paymentUpdateSchema } from '#/interfaces/http/docs/payment.docs';

export const paymentRoute = (app: FastifyInstance) => {
    const controller = app.container.get<PaymentController>(TYPES.PaymentController);

    app.get('/:id', paymentGetSchema, controller.get.bind(controller));
    app.get('/', paymentListSchema, controller.list.bind(controller));
    app.patch('/:id', paymentUpdateSchema, controller.update.bind(controller));
};
