import { OrderStatus } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { ListOrderRequestDto } from '#/application/use-cases/order/list-order/list-order.dto';
import { UpdateOrderDto } from '#/application/use-cases/order/update-order/update-order.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IOrderController } from '#/interfaces/controller/types/order';
import {
    orderCreateSchema,
    orderDeleteSchema,
    orderGetSchema,
    orderListSchema,
    orderUpdateSchema,
    orderUpdateStatusSchema,
} from '#/interfaces/http/docs/order.docs';

export const orderRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IOrderController>(TYPES.OrderController);

    app.post('/', orderCreateSchema, async (req, reply) => {
        const body = req.body as CreateOrderDto;
        const response = await controller.create(body);
        reply.status(201).send(response);
    });

    app.delete('/:id', orderDeleteSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        await controller.delete(id);
        return reply.send({ message: 'Order deleted successfully' });
    });

    app.get('/:id', orderGetSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const response = await controller.get(id);
        return reply.send(response);
    });

    app.get('/', orderListSchema, async (req, reply) => {
        const query = req.query as ListOrderRequestDto;
        const response = await controller.list(query);
        return reply.send(response);
    });

    app.patch('/:id', orderUpdateSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const body = req.body as UpdateOrderDto;
        const response = await controller.update(id, body);
        return reply.send(response);
    });

    app.patch('/:id/status', orderUpdateStatusSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const { status } = req.body as { status: OrderStatus };
        const response = await controller.updateStatus(id, status);
        return reply.send(response);
    });
};
