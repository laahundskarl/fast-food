import { FastifyReply, FastifyRequest } from 'fastify';

import { Client } from '#/core/application/use-cases/client';
import { ClientCreateDto } from '#/infrastructure/adapters/dto/client/client-create.dto';
import { ClientListDto } from '#/infrastructure/adapters/dto/client/client-list.dto';
import { TypeormClientRepository } from '#/infrastructure/persistence/typeorm-client.repository';

export class ClientController {
    async create(request: FastifyRequest<{ Body: ClientCreateDto }>, reply: FastifyReply) {
        const repository = new TypeormClientRepository();
        const useCase = new Client(repository);
        const result = await useCase.create(request.body);
        return reply.send(result);
    }

    async find(request: FastifyRequest<{ Params: ClientListDto }>, reply: FastifyReply) {
        const repository = new TypeormClientRepository();
        const useCase = new Client(repository);
        const result = await useCase.find(request.params);
        return reply.send(result);
    }

    // async update(request: FastifyRequest<{ Body: ClientCreateDto }>, reply: FastifyReply) {}

    // async delete(request: FastifyRequest<{ Params: ClientListDto }>, reply: FastifyReply) {}
}
