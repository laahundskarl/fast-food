import { inject, injectable } from 'inversify';

import { IGetClientByCpfUseCase } from '#/application/use-cases/client/get-client-by-cpf/get-client-by-cpf.use-case';
import { Client } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetClientByCpf implements IGetClientByCpfUseCase {
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

        this.logger.info('Client fetched successfully', { client });

        return client;
    }
}
