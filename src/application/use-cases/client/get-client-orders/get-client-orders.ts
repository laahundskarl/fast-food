import { inject, injectable } from 'inversify';

import { IGetClientOrdersUseCase } from '#/application/use-cases/client/get-client-orders/get-client-orders.use-case';
import { IClient } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetClientOrders implements IGetClientOrdersUseCase {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string, includes: string[]): Promise<IClient> {
        const client = await this.clientRepository.findByCpf(cpf, includes);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    }
}
