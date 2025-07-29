import { Client } from '#/domain/entities/client.entity';

export interface IGetClientUseCase {
    execute(cpf: string): Promise<Client>;
}
