import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateOrderUseCase } from '#/core/application/usecases/order/create-order.usecase';
import { DeleteOrderUseCase } from '#/core/application/usecases/order/delete-order.usecase';
import { GetOrderUseCase } from '#/core/application/usecases/order/get-order.usecase';
import { ListOrderUseCase } from '#/core/application/usecases/order/list-order.usecase';
import { UpdateOrderUseCase } from '#/core/application/usecases/order/update-order.usecase';
import { OrderCreateDto, OrderListDto, OrderUpdateDto } from '#/infrastructure/adapters/dto/order.dto';
import { PrismaOrderRepository } from '#/infrastructure/persistence/prisma/prisma-order.repository';

export class OrderController {
    private readonly repository: PrismaOrderRepository;

    constructor() {
        this.repository = new PrismaOrderRepository(new PrismaClient());
    }

    async create(request: FastifyRequest<{ Body: OrderCreateDto }>, reply: FastifyReply) {
        const useCase = new CreateOrderUseCase(this.repository);
        const result = await useCase.execute(request.body);
        return reply.status(201).send(result);
    }

    async list(request: FastifyRequest<{ Querystring: OrderListDto }>, reply: FastifyReply) {
        const useCase = new ListOrderUseCase(this.repository);
        const result = await useCase.execute(request.query);
        return reply.send(result);
    }

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new GetOrderUseCase(this.repository);
        const result = await useCase.execute(request.params.id);
        return reply.status(200).send(result);
    }

    async update(request: FastifyRequest<{ Params: { id: string }; Body: OrderUpdateDto }>, reply: FastifyReply) {
        const useCase = new UpdateOrderUseCase(this.repository);
        const result = await useCase.execute(request.params.id, request.body);
        return reply.send(result);
    }

    async destroy(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new DeleteOrderUseCase(this.repository);
        await useCase.execute(request.params.id);
        return reply.send({ message: 'Order deleted successfully' });
    }
}
