import { inject, injectable } from 'inversify';

import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IClientController } from '#/interfaces/controller/types/client';
import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';
import { ClientPresenter } from '#/interfaces/presenter/client/client.presenter';

@injectable()
export class ClientController implements IClientController {
    constructor(
        @inject(TYPES.CreateClientUseCase) private readonly createClientUseCase: ICreateClientUseCase,
        @inject(TYPES.DeleteClientUseCase) private readonly deleteClientUseCase: IDeleteClientUseCase,
        @inject(TYPES.GetClientUseCase) private readonly getClientUseCase: IGetClientUseCase,
        @inject(TYPES.UpdateClientUseCase) private readonly updateClientUseCase: IUpdateClientUseCase,
    ) {}

    async create(request: CreateClientDto): Promise<ClientResponseDTO> {
        const response = await this.createClientUseCase.execute(request);
        return ClientPresenter.toDTO(response);
    }

    async delete(cpf: string): Promise<void> {
        await this.deleteClientUseCase.execute(cpf);
    }

    async get(cpf: string, includes: string[]): Promise<ClientResponseDTO> {
        const response = await this.getClientUseCase.execute(cpf, includes);
        return ClientPresenter.toDTO(response);
    }

    async update(cpf: string, request: UpdateClientDto): Promise<ClientResponseDTO> {
        const response = await this.updateClientUseCase.execute(cpf, request);
        return ClientPresenter.toDTO(response);
    }
}
