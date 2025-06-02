import { Client } from '#/core/domain/entities/client.entity';

export interface ClientRepository {
    create(client: Client): Promise<Client>;
    findWithOrders(id: string): Promise<Client | null>;
    findByCpf(cpf: string): Promise<Client | null>;
    update(id: string, client: Client): Promise<Client>;
    destroy(id: string): Promise<void>;
}
