import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { ClientResponseDto } from '#/infrastructure/adapters/dto/client-response.dto';
import { ClientDto } from '#/infrastructure/adapters/dto/client.dto';

export class UpdateClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string, request: ClientDto): Promise<ClientResponseDto> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        client.name = request.name;
        client.cpf = request.cpf;
        client.email = request.email;
        return new ClientResponseDto(await this.clientRepository.update(client));
    }
}
