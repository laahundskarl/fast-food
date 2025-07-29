import { inject, injectable } from 'inversify';

import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { Client } from '#/domain/entities/client.entity';
import { ConflictError, NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class UpdateClient implements IUpdateClientUseCase {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string, request: UpdateClientDto): Promise<Client> {
        const client = await this.clientRepository.findByCpf(cpf, false);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        if (request.cpf && request.cpf !== client.cpf) {
            const existingClientByCpf = await this.clientRepository.findByCpf(request.cpf, false);
            if (existingClientByCpf) {
                throw new ConflictError('Client already exists with this cpf.');
            }
        }
        if (request.email && request.email !== client.email) {
            const existingClientByEmail = await this.clientRepository.findByEmail(request.email);
            if (existingClientByEmail) {
                throw new ConflictError('Client already exists with this email.');
            }
        }
        const updateClient = new Client({
            id: client.id,
            name: request.name ?? client.name,
            cpf: request.cpf ?? client.cpf,
            email: request.email ?? client.email,
        });
        return await this.clientRepository.update(updateClient);
    }
}
