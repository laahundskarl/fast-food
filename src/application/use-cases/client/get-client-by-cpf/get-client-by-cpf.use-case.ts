import { Client } from '#/domain/entities/client.entity';

export interface IGetClientByCpfUseCase {
    execute(cpf: string): Promise<Client>;
}
