import { inject, injectable } from 'inversify';

import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { Client } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetClient implements IGetClientUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository,
    ) {}

    async execute(cpf: string): Promise<Client> {
        this.logger.info('Fetching client', { cpf });

        const client = await this.clientRepository.findByCpf(cpf);

        if (!client) {
            this.logger.warn('Client not found', { cpf });
            throw new NotFoundError('Client not found');
        }

        this.logger.info('Client fetched successfully', { clientId: client.id, cpf });

        return client;
    }
}
