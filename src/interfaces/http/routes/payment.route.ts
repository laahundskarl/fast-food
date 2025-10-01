import { FastifyInstance } from 'fastify';

import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IPaymentController } from '#/interfaces/controller/types/payment';
import { paymentGetSchema, paymentListSchema } from '#/interfaces/http/docs/payment.docs';

export const paymentRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IPaymentController>(TYPES.PaymentController);

    app.get('/:id', paymentGetSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const response = await controller.get(id);
        return reply.send(response);
    });

    app.get('/', paymentListSchema, async (req, reply) => {
        const query = req.query as ListPaymentDto;
        const response = await controller.list(query);
        return reply.send(response);
    });
};
