import { FastifyReply, FastifyRequest } from 'fastify';

import { IdentifyUseCase } from '#/core/application/usecases/identify/identify.usecase';
import { globalPrismaClient } from '#/database/prisma';
import { PrismaClientRepository } from '#/infrastructure/persistence/prisma/prisma-client.repository';

export class IdentifyController {
    private readonly repository: PrismaClientRepository;

    constructor() {
        this.repository = new PrismaClientRepository(globalPrismaClient);
    }

    async get(request: FastifyRequest<{ Body: { cpf: string } }>, reply: FastifyReply) {
        const useCase = new IdentifyUseCase(this.repository);
        const result = await useCase.execute(request.body.cpf);
        return reply.send(result);
    }
}
