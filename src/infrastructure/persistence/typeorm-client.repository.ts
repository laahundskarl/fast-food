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

    // create(client: Client): Promise<Client> {
    //     throw new Error('Method not implemented.');
    // }

    // update(id: string, client: Client): Promise<Client> {
    //     throw new Error('Method not implemented.');
    // }

    // delete(id: string): Promise<void> {
    //     throw new Error('Method not implemented.');
    // }
}
