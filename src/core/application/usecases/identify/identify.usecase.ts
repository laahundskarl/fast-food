import { Client } from '#/core/domain/entities/client.entity';
import { ClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class IdentifyUseCase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(cpf: string): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found, please register');
        }
        return client;
    }
}
