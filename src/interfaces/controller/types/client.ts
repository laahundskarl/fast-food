import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';

export interface IClientController {
    create(request: CreateClientDto): Promise<ClientResponseDTO>;
    delete(cpf: string): Promise<void>;
    get(cpf: string, includes: string[]): Promise<ClientResponseDTO>;
    update(cpf: string, request: UpdateClientDto): Promise<ClientResponseDTO>;
}
