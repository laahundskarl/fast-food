import { IClientRepository } from '#/core/domain/repositories/client.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class DeleteClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(cpf: string): Promise<void> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        await this.clientRepository.destroy(client.id);
    }
}
