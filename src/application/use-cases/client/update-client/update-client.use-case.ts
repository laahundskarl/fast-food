import { Client } from '#/domain/entities/client.entity';
import { ClientUpdateRequest } from '#/interfaces/http/schemas/client/client-request.schema';

export interface IUpdateClientUseCase {
    execute(cpf: string, request: ClientUpdateRequest): Promise<Client>;
}
