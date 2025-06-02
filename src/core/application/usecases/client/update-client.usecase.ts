import { Client } from '#/core/domain/entities/client.entity';
import { ClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { ClientUpdateDto } from '#/infrastructure/adapters/dto/client.dto';

export class UpdateClientUseCase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(cpf: string, request: ClientUpdateDto): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        const updateClient = new Client(
            request.name ?? client.name,
            request.email ?? client.email,
            request.cpf ?? client.cpf,
        );
        return await this.clientRepository.update(client.id!, updateClient);
    }
}
