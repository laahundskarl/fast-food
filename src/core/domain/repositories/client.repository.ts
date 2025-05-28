import { Client } from '#/core/domain/entities/client.entity';

export interface IClientRepository {
    create(client: Client): Promise<Client>;
    findByCpf(cpf: string): Promise<Client | null>;
    // update(id: string, client: Client): Promise<Client>;
    // delete(id: string): Promise<void>;
}
