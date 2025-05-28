import { randomUUID } from 'crypto';

import { Client as ClientEntity } from '#/core/domain/entities/client.entity';
import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { ClientCreateDto } from '#/infrastructure/adapters/dto/client/client-create.dto';
import { ClientListDto } from '#/infrastructure/adapters/dto/client/client-list.dto';

export class Client {
    constructor(private readonly clientRepository: IClientRepository) {}

    async create(request: ClientCreateDto) {
        const alreadyExists = await this.clientRepository.findByCpf(request.cpf);
        if (alreadyExists) {
            throw new Error('Client already exists with this cpf.');
        }
        const client = new ClientEntity();
        client.publicId = randomUUID();
        client.name = request.name;
        client.cpf = request.cpf;
        client.email = request.email;
        return await this.clientRepository.create(client);
    }

    async find(request: ClientListDto): Promise<ClientEntity> {
        const client = await this.clientRepository.findByCpf(request.cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    }
}
