import { ClientCreateDto } from '#/dto/client.dto';
import { Client } from '#/entities/client.entity';
import { ConflictError } from '#/errors/app-error';
import { IClientRepository } from '#/repositories/client.repository';

export class CreateClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(request: ClientCreateDto): Promise<Client> {
        const alreadyExists = await this.clientRepository.findByCpfOrEmail(request.cpf, request.email);
        const conflictingField = alreadyExists?.cpf === request.cpf ? 'cpf' : 'email';
        if (alreadyExists) {
            throw new ConflictError(`Client already exists with this ${conflictingField}.`);
        }
        const client = new Client({ name: request.name, cpf: request.cpf, email: request.email });
        return await this.clientRepository.create(client);
    }
}
