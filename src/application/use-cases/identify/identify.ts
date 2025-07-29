import { inject, injectable } from 'inversify';

import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';
import { IIdentifyUseCase } from '#/application/use-cases/identify/identify.use-case';
import { Client } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class Identify implements IIdentifyUseCase {
    constructor(@inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(request: IdentifyDto): Promise<Client> {
        const client = await this.clientRepository.findByCpf(request.cpf);
        if (!client) {
            throw new NotFoundError('Client not found, please register');
        }
        return client;
    }
}
