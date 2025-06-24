import { FastifyReply, FastifyRequest } from 'fastify';

import { OrderCreateDto, OrderListRequestDto, OrderUpdateDto } from '#/dto/order.dto';
import { IOrderRepository } from '#/repositories/order.repository';
import { IProductRepository } from '#/repositories/product.repository';
import { CreateOrderUseCase } from '#/usecases/order/create-order.usecase';
import { DeleteOrderUseCase } from '#/usecases/order/delete-order.usecase';
import { GetOrderUseCase } from '#/usecases/order/get-order.usecase';
import { ListOrderUseCase } from '#/usecases/order/list-order.usecase';
import { UpdateOrderUseCase } from '#/usecases/order/update-order.usecase';

export class OrderController {
    private readonly orderRepository: IOrderRepository;
    private readonly productRepository: IProductRepository;

    constructor(orderRepository: IOrderRepository, productRepository: IProductRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
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
