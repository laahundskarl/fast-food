import { Client } from '#/domain/entities/client.entity';

export interface IGetClientByIdUseCase {
    execute(id: string): Promise<Client>;
}
