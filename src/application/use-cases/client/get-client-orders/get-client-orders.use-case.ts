import { IClient } from '#/domain/entities/client.entity';

export interface IGetClientOrdersUseCase {
    execute(cpf: string): Promise<IClient>;
}
