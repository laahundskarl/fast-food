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
            request.cpf ?? client.cpf,
            request.email ?? client.email,
        );
        return await this.clientRepository.update(client.id!, updateClient);
    }
}
