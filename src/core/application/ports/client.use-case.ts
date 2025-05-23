import { Client } from '#/core/domain/entities/client.entity';

export interface IClientUseCase {
    findByCpf(cpf: string): Promise<Client>;
}
