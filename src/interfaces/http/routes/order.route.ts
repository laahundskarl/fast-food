import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/types';
import { OrderController } from '#/interfaces/controller/order.controller';
import {
    orderCreateSchema,
    orderDeleteSchema,
    orderGetSchema,
    orderListSchema,
    orderUpdateSchema,
} from '#/interfaces/http/docs/order.docs';

export const orderRoute = (app: FastifyInstance) => {
    const controller = app.container.get<OrderController>(TYPES.OrderController);

    app.post('/', orderCreateSchema, controller.create.bind(controller));
    app.delete('/:id', orderDeleteSchema, controller.delete.bind(controller));
    app.get('/:id', orderGetSchema, controller.get.bind(controller));
    app.get('/', orderListSchema, controller.list.bind(controller));
    app.patch('/:id', orderUpdateSchema, controller.update.bind(controller));
};
