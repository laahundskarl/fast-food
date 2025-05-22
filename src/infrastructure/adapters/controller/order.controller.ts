import { FastifyReply, FastifyRequest } from 'fastify';

import { Order } from '#/core/application/use-cases/order';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';
import { TypeormOrderRepository } from '#/infrastructure/persistence/typeorm-order.repository';

export class OrderController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as OrderListDTO;

        const repository = new TypeormOrderRepository();
        const useCase = new Order(repository);

        const result = await useCase.list(query);

        return reply.status(201).send(result);
    }
}
