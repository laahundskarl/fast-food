import { describe, expect, it } from 'vitest';

import { GetClientById } from '#/application/use-cases/client/get-client-by-id/get-client-by-id';
import { NotFoundError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('get-client-by-id', () => {
    const loggerMock = createLoggerMock();
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const getClientUseCase = new GetClientById(loggerMock, clientRepository);

    it('should get a client by id', async () => {
        const findByIdMock = clientMock.mockClientFindById({ empty: false });

        const result = await getClientUseCase.execute('12345');

        expect(result).toMatchObject({
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        expect(findByIdMock).toHaveBeenCalledWith('12345');
    });

    it('should throw NotFoundError if client does not exist', async () => {
        clientMock.mockClientFindById({ empty: true });

        await expect(getClientUseCase.execute('12345')).rejects.toThrow(NotFoundError);
    });
});
