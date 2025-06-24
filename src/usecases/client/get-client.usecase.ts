import { Client } from '#/entities/client.entity';
import { NotFoundError } from '#/errors/app-error';
import { IClientRepository } from '#/repositories/client.repository';

export class GetClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    }
}
