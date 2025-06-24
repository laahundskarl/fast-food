import { ClientUpdateDto } from '#/dto/client.dto';
import { Client } from '#/entities/client.entity';
import { ConflictError, NotFoundError } from '#/errors/app-error';
import { IClientRepository } from '#/repositories/client.repository';

export class UpdateClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string, request: ClientUpdateDto): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf);
        const alreadyExists = await this.clientRepository.findByCpfOrEmail(request.cpf ?? '', request.email ?? '');
        const conflictingField = alreadyExists?.cpf === request.cpf ? 'cpf' : 'email';
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        if (alreadyExists && alreadyExists.id !== client.id) {
            throw new ConflictError(`Client already exists with this ${conflictingField}.`);
        }
        const updateClient = new Client({
            name: request.name ?? client.name,
            cpf: request.cpf ?? client.cpf,
            email: request.email ?? client.email,
        });
        return await this.clientRepository.update(client.id!, updateClient);
    }
}
