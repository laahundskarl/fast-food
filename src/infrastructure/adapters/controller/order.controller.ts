import { FastifyReply, FastifyRequest } from 'fastify';

import { Order } from '#/core/application/use-cases/order';
import { OrderCreateDTO, OrderListDTO, OrderUpdateDTO } from '#/infrastructure/adapters/dto/order-list.dto';
import { TypeormOrderRepository } from '#/infrastructure/persistence/typeorm-order.repository';

export class OrderController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as OrderListDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new Order(repository);

        const result = await useCase.list(query);

        return reply.status(201).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormOrderRepository();
        const useCase = new Order(repository);

        const result = await useCase.get(id);

        return reply.status(200).send(result);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as OrderCreateDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new Order(repository);

        const result = await useCase.create(body);

        return reply.status(201).send(result);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const body = request.body as OrderUpdateDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new Order(repository);

        const result = await useCase.update(id, body);

        return reply.status(200).send(result);
    }

    async destroy(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormOrderRepository();
        const useCase = new Order(repository);

        await useCase.destroy(id);

        return reply.status(200).send({ message: 'Order deleted successfully' });
    }
}
