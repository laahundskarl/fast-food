import { inject, injectable } from 'inversify';

import { IGetClientByIdUseCase } from '#/application/use-cases/client/get-client-by-id/get-client-by-id.use-case';
import { Client } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetClientById implements IGetClientByIdUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository,
    ) {}

    async execute(id: string): Promise<Client> {
        this.logger.info('Fetching client', { id });

        const client = await this.clientRepository.findById(id);

        if (!client) {
            this.logger.warn('Client not found', { id });
            throw new NotFoundError('Client not found');
        }

        this.logger.info('Client fetched successfully', { client });
        return client;
    }
}
