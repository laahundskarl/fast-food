import { IClientUseCase } from '#/core/application/ports/client.use-case';
import { Client as ClientEntity } from '#/core/domain/entities/client.entity';
import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class Client implements IClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async findByCpf(cpf: string): Promise<ClientEntity> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    }
}
