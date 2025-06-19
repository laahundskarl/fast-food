import { Client } from '#/entities/client.entity';
import { NotFoundError } from '#/errors/app-error';
import { ClientRepository } from '#/repositories/client.repository';

export class GetClientWithOrders {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(cpf: string): Promise<Client> {
        const client = await this.clientRepository.findWithOrders(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    }
}
