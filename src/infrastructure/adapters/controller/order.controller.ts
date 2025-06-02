import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateOrderUseCase } from '#/core/application/usecases/order/create-order.usecase';
import { DeleteOrderUseCase } from '#/core/application/usecases/order/delete-order.usecase';
import { GetOrderUseCase } from '#/core/application/usecases/order/get-order.usecase';
import { ListOrderUseCase } from '#/core/application/usecases/order/list-order.usecase';
import { UpdateOrderUseCase } from '#/core/application/usecases/order/update-order.usecase';
import { globalPrismaClient } from '#/database/prisma';
import { OrderCreateDto, OrderListRequestDto, OrderUpdateDto } from '#/infrastructure/adapters/dto/order.dto';
import { PrismaOrderRepository } from '#/infrastructure/persistence/prisma/prisma-order.repository';
import { PrismaProductRepository } from '#/infrastructure/persistence/prisma/prisma-product.repository';

export class OrderController {
    private readonly orderRepository: PrismaOrderRepository;
    private readonly productRepository: PrismaProductRepository;

    constructor() {
        this.orderRepository = new PrismaOrderRepository(globalPrismaClient);
        this.productRepository = new PrismaProductRepository(globalPrismaClient);
    }

    async create(request: FastifyRequest<{ Body: OrderCreateDto }>, reply: FastifyReply) {
        const useCase = new CreateOrderUseCase(this.orderRepository, this.productRepository);
        const result = await useCase.execute(request.body);
        return reply.status(201).send(result);
    }

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new GetOrderUseCase(this.orderRepository);
        const result = await useCase.execute(request.params.id);
        return reply.send(result);
    }

    async list(request: FastifyRequest<{ Querystring: OrderListRequestDto }>, reply: FastifyReply) {
        const useCase = new ListOrderUseCase(this.orderRepository);
        const result = await useCase.execute(request.query);
        return reply.send(result);
    }

    async update(request: FastifyRequest<{ Params: { id: string }; Body: OrderUpdateDto }>, reply: FastifyReply) {
        const useCase = new UpdateOrderUseCase(this.orderRepository, this.productRepository);
        const result = await useCase.execute(request.params.id, request.body);
        return reply.send(result);
    }

    async destroy(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new DeleteOrderUseCase(this.orderRepository);
        await useCase.execute(request.params.id);
        return reply.send({ message: 'Order deleted successfully' });
    }
}
