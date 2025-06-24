import { FastifyReply, FastifyRequest } from 'fastify';

import { IClientRepository } from '#/repositories/client.repository';
import { IdentifyUseCase } from '#/usecases/identify/identify.usecase';

export class IdentifyController {
    private readonly repository: IClientRepository;

    constructor(db: IClientRepository) {
        this.repository = db;
    }

    async get(request: FastifyRequest<{ Body: { cpf: string } }>, reply: FastifyReply) {
        const useCase = new IdentifyUseCase(this.repository);
        const result = await useCase.execute(request.body.cpf);
        return reply.send(result);
    }
}
