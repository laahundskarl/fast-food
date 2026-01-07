import { Client } from '#/domain/entities/client.entity';
import { ClientCreateRequest } from '#/interfaces/http/schemas/client/client-request.schema';

export interface ICreateClientUseCase {
    execute(request: ClientCreateRequest): Promise<Client>;
}
