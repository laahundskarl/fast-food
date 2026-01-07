import { inject, injectable } from 'inversify';

import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { Client } from '#/domain/entities/client.entity';
import { ConflictError, NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ClientUpdateRequest } from '#/interfaces/http/schemas/client/client-request.schema';

@injectable()
export class UpdateClient implements IUpdateClientUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository,
    ) {}

    async execute(cpf: string, request: ClientUpdateRequest): Promise<Client> {
        this.logger.info('Updating client', { cpf, updates: request });

        const client = await this.findClientOrFail(cpf);
        await this.validateUniqueConstraints(client, request);

        const updateClient = new Client({
            id: client.id,
            name: request.name ?? client.name,
            cpf: request.cpf ?? client.cpf,
            email: request.email ?? client.email,
        });
        const result = await this.clientRepository.update(updateClient);

        this.logger.info('Client updated successfully', { clientId: result.id, cpf: result.cpf });

        return result;
    }

    private async findClientOrFail(cpf: string): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf);

        if (!client) {
            this.logger.warn('Client update failed - not found', { cpf });
            throw new NotFoundError('Client not found');
        }

        return client;
    }

    private async validateUniqueConstraints(client: Client, request: ClientUpdateRequest): Promise<void> {
        if (request.cpf && request.cpf !== client.cpf) {
            await this.validateCpfIsUnique(request.cpf);
        }

        if (request.email && request.email !== client.email) {
            await this.validateEmailIsUnique(request.email);
        }
    }

    private async validateCpfIsUnique(cpf: string): Promise<void> {
        const existingClient = await this.clientRepository.findByCpf(cpf);

        if (existingClient) {
            this.logger.warn('Client update failed - CPF already exists', { cpf });
            throw new ConflictError('Client already exists with this cpf.');
        }
    }

    private async validateEmailIsUnique(email: string): Promise<void> {
        const existingClient = await this.clientRepository.findByEmail(email);

        if (existingClient) {
            this.logger.warn('Client update failed - email already exists', { email });
            throw new ConflictError('Client already exists with this email.');
        }
    }
}
