import { FastifyInstance } from 'fastify';

import { OrderController } from '#/infrastructure/adapters/controller/order.controller';
import {
    orderCreateSchema,
    orderDeleteSchema,
    orderGetSchema,
    orderListSchema,
    orderUpdateSchema,
} from '#/interfaces/http/docs/order.docs';

export const orderRoute = (app: FastifyInstance) => {
    const controller = new OrderController();
    app.post('/', orderCreateSchema, controller.create.bind(controller));
    app.get('/:id', orderGetSchema, controller.get.bind(controller));
    app.get('/', orderListSchema, controller.list.bind(controller));
    app.patch('/:id', orderUpdateSchema, controller.update.bind(controller));
    app.delete('/:id', orderDeleteSchema, controller.destroy.bind(controller));
};
