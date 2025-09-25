import { IClient } from '#/domain/entities/client.entity';

export interface IClientRepository {
    create(client: IClient): Promise<IClient>;
    findByCpf(cpf: string, withOrders: boolean): Promise<IClient | null>;
    findByEmail(email: string): Promise<IClient | null>;
    findByCpfOrEmail(cpf: string, email: string): Promise<IClient | null>;
    findById(id: string): Promise<IClient | null>;
    update(client: IClient): Promise<IClient>;
    destroy(cpf: string): Promise<void>;
}
