import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { ClientResponseDto } from '#/infrastructure/adapters/dto/client-response.dto';

export class GetClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string): Promise<ClientResponseDto> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return new ClientResponseDto(client);
    }
}
