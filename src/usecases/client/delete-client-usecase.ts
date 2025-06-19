import { NotFoundError } from '#/errors/app-error';
import { ClientRepository } from '#/repositories/client.repository';

export class DeleteClientUseCase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(cpf: string): Promise<void> {
        const client = await this.clientRepository.findByCpf(cpf);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        await this.clientRepository.destroy(client.id!);
    }
}
