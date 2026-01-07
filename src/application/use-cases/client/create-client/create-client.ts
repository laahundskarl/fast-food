import { inject, injectable } from 'inversify';

import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { Client } from '#/domain/entities/client.entity';
import { ConflictError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ClientCreateRequest } from '#/interfaces/http/schemas/client/client-request.schema';

@injectable()
export class CreateClient implements ICreateClientUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository,
    ) {}

    async execute(request: ClientCreateRequest): Promise<Client> {
        this.logger.info('Creating new client', { cpf: request.cpf, email: request.email });

        const alreadyExists = await this.clientRepository.findByCpfOrEmail(request.cpf, request.email);

        if (alreadyExists) {
            const conflictingField = alreadyExists?.cpf === request.cpf ? 'cpf' : 'email';
            this.logger.warn('Client creation failed - already exists', {
                conflictingField,
                value: request[conflictingField],
            });
            throw new ConflictError(`Client already exists with this ${conflictingField}.`);
        }
        const client = new Client({
            name: request.name,
            cpf: request.cpf,
            email: request.email,
        });

        const createdClient = await this.clientRepository.create(client);

        this.logger.info('Client created successfully', { clientId: createdClient.id, cpf: createdClient.cpf });

        return createdClient;
    }
}
