import { describe, expect, it } from 'vitest';

import { UpdateClient } from '#/application/use-cases/client/update-client/update-client';
import { Client } from '#/domain/entities/client.entity';
import { ConflictError, NotFoundError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('update-client', () => {
    const loggerMock = createLoggerMock();
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const updateClientUseCase = new UpdateClient(loggerMock, clientRepository);

    const existingClient = new Client({
        id: '1',
        name: 'John Doe',
        cpf: '12345678900',
        email: 'john.doe@example.com',
    });

    it('should update a client', async () => {
        clientMock.mockClientFindByCpf({ data: existingClient });
        const updatedClient = new Client({
            id: '1',
            name: 'John Updated',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        const updateMock = clientMock.mockClientUpdate({ data: updatedClient });

        const result = await updateClientUseCase.execute('12345678900', { name: 'John Updated' });

        expect(result).toMatchObject({
            name: 'John Updated',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        expect(updateMock).toHaveBeenCalled();
    });

    it('should throw NotFoundError if client does not exist', async () => {
        clientMock.mockClientFindByCpf({ empty: true });

        await expect(updateClientUseCase.execute('99999999999', { name: 'New Name' })).rejects.toThrow(NotFoundError);
    });

    it('should throw ConflictError if updating cpf to one that already exists', async () => {
        clientMock.mockClientFindByCpf({ data: existingClient });
        clientMock.mockClientFindByCpf({ empty: false });

        await expect(updateClientUseCase.execute('12345678900', { cpf: '98765432100' })).rejects.toThrow(ConflictError);
    });

    it('should throw ConflictError if updating email to one that already exists', async () => {
        clientMock.mockClientFindByCpf({ data: existingClient });
        clientMock.mockClientFindByEmail({ empty: false });

        await expect(updateClientUseCase.execute('12345678900', { email: 'existing@example.com' })).rejects.toThrow(
            ConflictError,
        );
    });
});
