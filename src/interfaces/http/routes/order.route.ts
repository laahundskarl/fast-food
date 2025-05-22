import { FastifyInstance } from 'fastify';

import { OrderController } from '#/infrastructure/adapters/controller/order.controller';
import { orderListSchema } from '#/interfaces/http/routes/schema/order.schema';

export const orderRoute = (app: FastifyInstance) => {
    const controller = new OrderController();

    app.get('/', orderListSchema, async (request, reply) => {
        return controller.list(request, reply);
    });
};
