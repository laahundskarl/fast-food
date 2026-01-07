import { vi } from 'vitest';

import { Client } from '#/domain/entities/client.entity';
import { IClientRepository } from '#/domain/repositories/client.repository';

export class PrismaClientMockRepository implements IClientRepository {
    async create(client: Client): Promise<Client> {
        return Promise.resolve(client);
    }

    async findByCpf(_cpf: string): Promise<Client | null> {
        return Promise.resolve(null);
    }

    async findByEmail(_email: string): Promise<Client | null> {
        return Promise.resolve(null);
    }

    async findByCpfOrEmail(_cpf: string, _email: string): Promise<Client | null> {
        return Promise.resolve(null);
    }

    async findById(_id: string): Promise<Client | null> {
        return Promise.resolve(null);
    }

    async update(client: Client): Promise<Client> {
        return Promise.resolve(client);
    }

    async destroy(_id: string): Promise<void> {
        return Promise.resolve();
    }
}

const clientMock = new Client({
    id: '1',
    name: 'John Doe',
    cpf: '12345678900',
    email: 'john.doe@example.com',
});

type MockOptions = {
    data?: Client;
    empty?: boolean;
};

export function mockClientCreateClient({ data = clientMock }: MockOptions = {}) {
    return vi.spyOn(PrismaClientMockRepository.prototype, 'create').mockResolvedValueOnce(data);
}

export function mockClientFindByCpfOrEmail({ data = clientMock, empty }: MockOptions = {}) {
    return vi
        .spyOn(PrismaClientMockRepository.prototype, 'findByCpfOrEmail')
        .mockResolvedValueOnce(empty ? null : data);
}

export function mockClientFindById({ data = clientMock, empty }: MockOptions = {}) {
    return vi.spyOn(PrismaClientMockRepository.prototype, 'findById').mockResolvedValueOnce(empty ? null : data);
}

export function mockClientUpdate({ data = clientMock }: MockOptions = {}) {
    return vi.spyOn(PrismaClientMockRepository.prototype, 'update').mockResolvedValueOnce(data);
}

export function mockClientFindByCpf({ data = clientMock, empty }: MockOptions = {}) {
    return vi.spyOn(PrismaClientMockRepository.prototype, 'findByCpf').mockResolvedValueOnce(empty ? null : data);
}

export function mockClientFindByEmail({ data = clientMock, empty }: MockOptions = {}) {
    return vi.spyOn(PrismaClientMockRepository.prototype, 'findByEmail').mockResolvedValueOnce(empty ? null : data);
}

export function mockClientDestroy() {
    return vi.spyOn(PrismaClientMockRepository.prototype, 'destroy').mockResolvedValueOnce();
}
