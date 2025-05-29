import { Repository } from 'typeorm';

import { Client } from '#/core/domain/entities/client.entity';
import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { AppDataSource } from '#/database/typeorm.config';

export class TypeormClientRepository implements IClientRepository {
    private repository: Repository<Client>;

    constructor() {
        this.repository = AppDataSource.getRepository(Client);
    }

    async create(client: Client): Promise<Client> {
        return await this.repository.save(client);
    }

    async findByCpf(cpf: string): Promise<Client | null> {
        return await this.repository.findOneBy({ cpf });
    }

    async update(client: Client): Promise<Client> {
        return await this.repository.save(client);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
