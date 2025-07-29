import { inject, injectable } from 'inversify';

import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { Client } from '#/domain/entities/client.entity';
import { ConflictError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class CreateClient implements ICreateClientUseCase {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(request: CreateClientDto): Promise<Client> {
        const alreadyExists = await this.clientRepository.findByCpfOrEmail(request.cpf, request.email);
        const conflictingField = alreadyExists?.cpf === request.cpf ? 'cpf' : 'email';
        if (alreadyExists) {
            throw new ConflictError(`Client already exists with this ${conflictingField}.`);
        }
        const client = new Client({
            name: request.name,
            cpf: request.cpf,
            email: request.email,
        });
        return await this.clientRepository.create(client);
    }
}
