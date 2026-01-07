import { Client } from '#/domain/entities/client.entity';

export interface IClientRepository {
    create(client: Client): Promise<Client>;
    findByCpf(cpf: string): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    findByCpfOrEmail(cpf: string, email: string): Promise<Client | null>;
    findById(id: string): Promise<Client | null>;
    update(client: Client): Promise<Client>;
    destroy(cpf: string): Promise<void>;
}
