import { FastifyInstance } from 'fastify';

import { OrderController } from '#/infrastructure/adapters/controller/order.controller';

export const orderRoute = (app: FastifyInstance) => {
    const controller = new OrderController();

    app.get('/', controller.list.bind(controller));
};
