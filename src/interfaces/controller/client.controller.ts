import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { IGetClientOrdersUseCase } from '#/application/use-cases/client/get-client-orders/get-client-orders.use-case';
import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { TYPES } from '#/infrastructure/config/types';
import { IClientController } from '#/interfaces/controller/types/client';
import { ClientPresenter } from '#/interfaces/presenter/client.presenter';
import { httpPresenter } from '#/interfaces/presenter/shared/http.presenter';

@injectable()
export class ClientController implements IClientController {
    constructor(
        @inject(TYPES.CreateClientUseCase) private readonly createClientUseCase: ICreateClientUseCase,
        @inject(TYPES.DeleteClientUseCase) private readonly deleteClientUseCase: IDeleteClientUseCase,
        @inject(TYPES.GetClientUseCase) private readonly getClientUseCase: IGetClientUseCase,
        @inject(TYPES.GetClientOrdersUseCase) private readonly getClientOrdersUseCase: IGetClientOrdersUseCase,
        @inject(TYPES.UpdateClientUseCase) private readonly updateClientUseCase: IUpdateClientUseCase,
    ) {}

    async create(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as CreateClientDto;
        const result = await this.createClientUseCase.execute(body);
        return reply.status(201).send(httpPresenter(ClientPresenter.createClientPresenter(result), 201));
    }

    async delete(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        await this.deleteClientUseCase.execute(request.params.cpf);
        return reply.send(httpPresenter({ message: 'Client deleted successfully' }, 200));
    }

    async get(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const result = await this.getClientUseCase.execute(request.params.cpf);
        return reply.send(httpPresenter(ClientPresenter.createClientPresenter(result), 200));
    }

    async getOrders(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const result = await this.getClientOrdersUseCase.execute(request.params.cpf);
        return reply.send(httpPresenter(ClientPresenter.getClientPresenter(result), 200));
    }

    async update(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
        const body = request.body as UpdateClientDto;
        const result = await this.updateClientUseCase.execute(request.params.cpf, body);
        return reply.send(httpPresenter(ClientPresenter.createClientPresenter(result), 200));
    }
}
