import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { IClient } from '#/domain/entities/client.entity';

export interface IUpdateClientUseCase {
    execute(cpf: string, request: UpdateClientDto): Promise<IClient>;
}
