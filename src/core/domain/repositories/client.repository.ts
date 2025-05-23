import { Client } from '#/core/domain/entities/client.entity';

export interface IClientRepository {
    findByCpf(cpf: string): Promise<Client | null>;
    // create(client: Client): Promise<Client>;
    // update(id: string, client: Client): Promise<Client>;
    // delete(id: string): Promise<void>;
}
