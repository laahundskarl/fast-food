import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateOrderUseCase } from '#/core/application/usecases/order/create-order.usecase';
import { DeleteOrderUseCase } from '#/core/application/usecases/order/delete-order.usecase';
import { GetOrderUseCase } from '#/core/application/usecases/order/get-order.usecase';
import { ListOrderUseCase } from '#/core/application/usecases/order/list-order.usecase';
import { UpdateOrderUseCase } from '#/core/application/usecases/order/update-order.usecase';
import { OrderCreateDTO, OrderListDTO, OrderUpdateDTO } from '#/infrastructure/adapters/dto/order-list.dto';
import { TypeormOrderRepository } from '#/infrastructure/persistence/typeorm-order.repository';

export class OrderController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as OrderListDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new ListOrderUseCase(repository);

        const result = await useCase.execute(query);

        return reply.status(201).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormOrderRepository();
        const useCase = new GetOrderUseCase(repository);

        const result = await useCase.execute(id);

        return reply.status(200).send(result);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as OrderCreateDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new CreateOrderUseCase(repository);

        const result = await useCase.execute(body);

        return reply.status(201).send(result);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const body = request.body as OrderUpdateDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new UpdateOrderUseCase(repository);

        const result = await useCase.execute(id, body);

        return reply.status(200).send(result);
    }

    async destroy(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormOrderRepository();
        const useCase = new DeleteOrderUseCase(repository);

        await useCase.execute(id);

        return reply.status(200).send({ message: 'Order deleted successfully' });
    }
}
