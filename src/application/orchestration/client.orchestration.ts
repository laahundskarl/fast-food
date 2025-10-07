import { inject, injectable } from 'inversify';

import { IClientOrchestration } from '#/application/orchestration/interfaces/i-client.orchestration';
import { IClient } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class ClientOrchestration implements IClientOrchestration {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async getClientIfExists(clientId?: string): Promise<IClient | undefined> {
        if (!clientId) return undefined;

        const client = await this.clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError(`Client with id ${clientId} not found`);
        }

        return client;
    }
}
