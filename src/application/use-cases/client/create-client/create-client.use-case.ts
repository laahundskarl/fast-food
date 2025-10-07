import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { IClient } from '#/domain/entities/client.entity';

export interface ICreateClientUseCase {
    execute(request: CreateClientDto): Promise<IClient>;
}
