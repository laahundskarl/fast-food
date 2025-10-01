import { inject, injectable } from 'inversify';

import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { Client } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetClient implements IGetClientUseCase {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string, includes: string[]): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf, includes);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    }
}
