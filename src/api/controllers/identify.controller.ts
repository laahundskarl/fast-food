import { FastifyReply, FastifyRequest } from 'fastify';

import { globalPrismaClient } from '#/database/prisma';
import { PrismaClientRepository } from '#/repositories/prisma/prisma-client.repository';
import { IdentifyUseCase } from '#/usecases/identify/identify.usecase';

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
