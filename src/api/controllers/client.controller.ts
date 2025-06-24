import { FastifyReply, FastifyRequest } from 'fastify';

import { ClientCreateDto, ClientUpdateDto } from '#/dto/client.dto';
import { ClientRepository } from '#/repositories/client.repository';
import { CreateClientUseCase } from '#/usecases/client/create-client.usecase';
import { DeleteClientUseCase } from '#/usecases/client/delete-client-usecase';
import { GetClientWithOrders } from '#/usecases/client/get-client-with-orders.usecase';
import { GetClientUseCase } from '#/usecases/client/get-client.usecase';
import { UpdateClientUseCase } from '#/usecases/client/update-client.usecase';

export class ClientController {
    private readonly repository: ClientRepository;

    constructor(db: ClientRepository) {
        this.repository = db;
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

    async getWithOrders(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const useCase = new GetClientWithOrders(this.repository);
        const result = await useCase.execute(request.params.cpf);
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
