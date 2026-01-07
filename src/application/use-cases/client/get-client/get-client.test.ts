import { describe, expect, it } from 'vitest';

import { GetClient } from '#/application/use-cases/client/get-client/get-client';
import { NotFoundError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('get-client', () => {
    const loggerMock = createLoggerMock();
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const getClientUseCase = new GetClient(loggerMock, clientRepository);

    it('should get a client by cpf', async () => {
        const findByCpfMock = clientMock.mockClientFindByCpf({ empty: false });

        const result = await getClientUseCase.execute('12345678900');

        expect(result).toMatchObject({
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        expect(findByCpfMock).toHaveBeenCalledWith('12345678900');
    });

    it('should throw NotFoundError if client does not exist', async () => {
        clientMock.mockClientFindByCpf({ empty: true });

        await expect(getClientUseCase.execute('99999999999')).rejects.toThrow(NotFoundError);
    });
});
