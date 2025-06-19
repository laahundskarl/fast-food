import { FastifyInstance } from 'fastify';

import { PaymentController } from '#/api/controllers/payment.controller';
import { paymentGetSchema, paymentListSchema, paymentUpdateSchema } from '#/docs/payment.docs';

export const paymentRoute = (app: FastifyInstance) => {
    const controller = new PaymentController();
    app.get('/:id', paymentGetSchema, controller.findById.bind(controller));
    app.get('/', paymentListSchema, controller.list.bind(controller));
    app.patch('/:id', paymentUpdateSchema, controller.update.bind(controller));
};
