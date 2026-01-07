import { inject, injectable } from 'inversify';

import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class DeleteClient implements IDeleteClientUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository,
    ) {}

    async execute(cpf: string): Promise<void> {
        this.logger.info('Deleting client', { cpf });

        const client = await this.clientRepository.findByCpf(cpf);

        if (!client) {
            this.logger.warn('Client deletion failed - not found', { cpf });
            throw new NotFoundError('Client not found');
        }

        await this.clientRepository.destroy(client.id);

        this.logger.info('Client deleted successfully', { clientId: client.id, cpf });
    }
}
