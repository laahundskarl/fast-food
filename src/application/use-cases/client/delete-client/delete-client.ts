import { inject, injectable } from 'inversify';

import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class DeleteClient implements IDeleteClientUseCase {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string): Promise<void> {
        const client = await this.clientRepository.findByCpf(cpf, false);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        await this.clientRepository.destroy(client.id);
    }
}
