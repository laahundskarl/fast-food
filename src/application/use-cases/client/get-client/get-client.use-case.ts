import { IClient } from '#/domain/entities/client.entity';

export interface IGetClientUseCase {
    execute(cpf: string): Promise<IClient>;
}
