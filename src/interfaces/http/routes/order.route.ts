import { FastifyInstance } from 'fastify';

import { OrderController } from '#/infrastructure/adapters/controller/order.controller';
import {
    orderCreateSchema,
    orderDeleteSchema,
    orderGetSchema,
    orderListSchema,
    orderUpdateSchema,
} from '#/interfaces/http/routes/schema/order.schema';

export const orderRoute = (app: FastifyInstance) => {
    const controller = new OrderController();

    app.get('/', orderListSchema, async (request, reply) => {
        return controller.list(request, reply);
    });

    app.get('/:id', orderGetSchema, async (request, reply) => {
        return controller.get(request, reply);
    });

    app.post('/', orderCreateSchema, async (request, reply) => {
        return controller.create(request, reply);
    });

    app.put('/:id', orderUpdateSchema, async (request, reply) => {
        return controller.update(request, reply);
    });

    app.delete('/:id', orderDeleteSchema, async (request, reply) => {
        return controller.destroy(request, reply);
    });
};
