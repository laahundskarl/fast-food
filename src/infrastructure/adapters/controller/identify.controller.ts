import { FastifyReply, FastifyRequest } from 'fastify';

import { IdentifyUseCase } from '#/core/application/usecases/identify/identify.usecase';
import { TypeormClientRepository } from '#/infrastructure/persistence/typeorm-client.repository';

export class IdentifyController {
    private readonly repository: TypeormClientRepository;

    constructor() {
        this.repository = new TypeormClientRepository();
    }

    async get(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        console.log(request.params.cpf);
        const useCase = new IdentifyUseCase(this.repository);
        const result = await useCase.execute(request.params.cpf);
        return reply.send(result);
    }
}
