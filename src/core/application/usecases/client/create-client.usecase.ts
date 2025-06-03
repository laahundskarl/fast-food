import { Client } from '#/core/domain/entities/client.entity';
import { ClientRepository } from '#/core/domain/repositories/client.repository';
import { ConflictError } from '#/core/shared/errors/app-error';
import { ClientCreateDto } from '#/infrastructure/adapters/dto/client.dto';

export class CreateClientUseCase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(request: ClientCreateDto): Promise<Client> {
        const alreadyExists = await this.clientRepository.findByCpfOrEmail(request.cpf, request.email);
        const conflictingField = alreadyExists?.cpf === request.cpf ? 'cpf' : 'email';
        if (alreadyExists) {
            throw new ConflictError(`Client already exists with this ${conflictingField}.`);
        }
        const client = new Client(request.name, request.cpf, request.email);
        return await this.clientRepository.create(client);
    }
}
