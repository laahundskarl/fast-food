import { FastifyReply, FastifyRequest } from 'fastify';

import { IdentifyUseCase } from '#/core/application/usecases/identify/identify.usecase';
import { globalPrismaClient } from '#/database/prisma';
import { PrismaClientRepository } from '#/infrastructure/persistence/prisma/prisma-client.repository';

export class IdentifyController {
    private readonly repository: PrismaClientRepository;

    constructor() {
        this.repository = new PrismaClientRepository(globalPrismaClient);
    }

    async get(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        console.log(request.params.cpf);
        const useCase = new IdentifyUseCase(this.repository);
        const result = await useCase.execute(request.params.cpf);
        return reply.send(result);
    }
}
