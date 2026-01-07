import { describe, expect, it } from 'vitest';

import { CreateClient } from '#/application/use-cases/client/create-client/create-client';
import { Client } from '#/domain/entities/client.entity';
import { ConflictError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';

describe('create-client', () => {
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const createClientUseCase = new CreateClient(clientRepository);
    it('should create a client', async () => {
        clientMock.mockClientFindByCpfOrEmail({ empty: true });
        const createClientMock = clientMock.mockClientCreateClient({});
        const client = new Client({
            id: '1',
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        const result = await createClientUseCase.execute(client);
        expect(result).toMatchObject({
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        expect(createClientMock).toHaveBeenCalled();
    });

    it('should throw an error if the client already exists', async () => {
        clientMock.mockClientFindByCpfOrEmail({ empty: false });
        await expect(
            createClientUseCase.execute({
                name: 'John Doe',
                cpf: '12345678900',
                email: 'john.doe@example.com',
            }),
        ).rejects.toThrow(ConflictError);
    });
});
