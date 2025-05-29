import { randomUUID } from 'crypto';

import { Client } from '#/core/domain/entities/client.entity';
import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { ConflictError } from '#/core/shared/errors/app-error';
import { ClientResponseDto } from '#/infrastructure/adapters/dto/client-response.dto';
import { ClientDto } from '#/infrastructure/adapters/dto/client.dto';

export class CreateClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(request: ClientDto): Promise<ClientResponseDto> {
        const alreadyExists = await this.clientRepository.findByCpf(request.cpf);
        if (alreadyExists) {
            throw new ConflictError('Client already exists with this cpf.');
        }
        const client = new Client();
        client.publicId = randomUUID();
        client.name = request.name;
        client.cpf = request.cpf;
        client.email = request.email;
        return new ClientResponseDto(await this.clientRepository.create(client));
    }
}
