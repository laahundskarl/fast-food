import { inject, injectable } from 'inversify';

import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ClientCreateRequest, ClientUpdateRequest } from '#/interfaces/http/schemas/client/client-request.schema';
import { ClientResponse } from '#/interfaces/http/schemas/client/client-response.schema';
import { DeleteResponse } from '#/interfaces/http/schemas/common/util.schema';
import { ClientPresenter } from '#/interfaces/presenter/client/client.presenter';

@injectable()
export class ClientController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.CreateClientUseCase) private readonly createClientUseCase: ICreateClientUseCase,
        @inject(TYPES.DeleteClientUseCase) private readonly deleteClientUseCase: IDeleteClientUseCase,
        @inject(TYPES.GetClientUseCase) private readonly getClientUseCase: IGetClientUseCase,
        @inject(TYPES.UpdateClientUseCase) private readonly updateClientUseCase: IUpdateClientUseCase,
    ) {}

    async create(request: ClientCreateRequest): Promise<ClientResponse> {
        this.logger.info('Creating a new client', { request });
        const response = await this.createClientUseCase.execute(request);
        return ClientPresenter.toHTTP(response);
    }

    async delete(cpf: string): Promise<DeleteResponse> {
        this.logger.info('Deleting client with CPF', { cpf });
        await this.deleteClientUseCase.execute(cpf);
        return ClientPresenter.toDeleteResponse();
    }

    async get(cpf: string): Promise<ClientResponse> {
        this.logger.info('Retrieving client with CPF', { cpf });
        const response = await this.getClientUseCase.execute(cpf);
        return ClientPresenter.toHTTP(response);
    }

    async update(cpf: string, request: ClientUpdateRequest): Promise<ClientResponse> {
        this.logger.info('Updating client with CPF', { cpf, request });
        const response = await this.updateClientUseCase.execute(cpf, request);
        return ClientPresenter.toHTTP(response);
    }
}
