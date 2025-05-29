import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateClientUseCase } from '#/core/application/usecases/client/create-client.usecase';
import { DeleteClientUseCase } from '#/core/application/usecases/client/delete-client-usecase';
import { GetClientUseCase } from '#/core/application/usecases/client/get-client.usecase';
import { UpdateClientUseCase } from '#/core/application/usecases/client/update-client.usecase';
import { ClientDto } from '#/infrastructure/adapters/dto/client.dto';
import { TypeormClientRepository } from '#/infrastructure/persistence/typeorm-client.repository';

export class ClientController {
    private readonly repository: TypeormClientRepository;

    constructor() {
        this.repository = new TypeormClientRepository();
    }

    async create(request: FastifyRequest<{ Body: ClientDto }>, reply: FastifyReply) {
        const useCase = new CreateClientUseCase(this.repository);
        const result = await useCase.execute(request.body);
        return reply.code(201).send(result);
    }

    async get(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        console.log(request.params.cpf);
        const useCase = new GetClientUseCase(this.repository);
        const result = await useCase.execute(request.params.cpf);
        return reply.send(result);
    }

    async update(request: FastifyRequest<{ Params: { cpf: string }; Body: ClientDto }>, reply: FastifyReply) {
        const useCase = new UpdateClientUseCase(this.repository);
        const result = await useCase.execute(request.params.cpf, request.body);
        return reply.send(result);
    }

    async delete(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const useCase = new DeleteClientUseCase(this.repository);
        await useCase.execute(request.params.cpf);
        reply.code(204).send();
    }
}
