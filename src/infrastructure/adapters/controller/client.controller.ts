import { FastifyReply, FastifyRequest } from 'fastify';

import { Client } from '#/core/application/use-cases/client';
import { TypeormClientRepository } from '#/infrastructure/persistence/typeorm-client.repository';

export class ClientController {
    async findByCpf(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const repository = new TypeormClientRepository();
        const useCase = new Client(repository);

        const result = await useCase.findByCpf(request.params.cpf);

        return reply.send(result);
    }
}
