import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateClientUseCase } from '#/core/application/usecases/client/create-client.usecase';
import { DeleteClientUseCase } from '#/core/application/usecases/client/delete-client-usecase';
import { GetClientWithOrders } from '#/core/application/usecases/client/get-client-with-orders.usecase';
import { GetClientUseCase } from '#/core/application/usecases/client/get-client.usecase';
import { UpdateClientUseCase } from '#/core/application/usecases/client/update-client.usecase';
import { globalPrismaClient } from '#/database/prisma';
import { ClientCreateDto, ClientUpdateDto } from '#/infrastructure/adapters/dto/client.dto';
import { PrismaClientRepository } from '#/infrastructure/persistence/prisma/prisma-client.repository';

export class ClientController {
    private readonly repository: PrismaClientRepository;

    constructor() {
        this.repository = new PrismaClientRepository(globalPrismaClient);
    }

    async create(request: FastifyRequest<{ Body: ClientCreateDto }>, reply: FastifyReply) {
        const useCase = new CreateClientUseCase(this.repository);
        const result = await useCase.execute(request.body);
        return reply.code(201).send(result);
    }

    async get(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const useCase = new GetClientUseCase(this.repository);
        const result = await useCase.execute(request.params.cpf);
        return reply.send(result);
    }

    async getWithOrders(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new GetClientWithOrders(this.repository);
        const result = await useCase.execute(request.params.id);
        return reply.send(result);
    }

    async update(request: FastifyRequest<{ Params: { cpf: string }; Body: ClientUpdateDto }>, reply: FastifyReply) {
        const useCase = new UpdateClientUseCase(this.repository);
        const result = await useCase.execute(request.params.cpf, request.body);
        return reply.send(result);
    }

    async delete(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const useCase = new DeleteClientUseCase(this.repository);
        await useCase.execute(request.params.cpf);
        return reply.send({ message: 'Client deleted successfully' });
    }
}
