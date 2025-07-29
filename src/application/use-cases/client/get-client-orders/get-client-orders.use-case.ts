import { Client } from '#/domain/entities/client.entity';

export interface IGetClientOrdersUseCase {
    execute(cpf: string): Promise<Client>;
}
