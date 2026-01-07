import { describe, expect, it } from 'vitest';

import { GetClientByCpf } from '#/application/use-cases/client/get-client-by-cpf/get-client-by-cpf';
import { NotFoundError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('get-client-by-cpf', () => {
    const loggerMock = createLoggerMock();
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const getClientByCpfUseCase = new GetClientByCpf(loggerMock, clientRepository);

    it('should get a client by cpf', async () => {
        const findByCpfMock = clientMock.mockClientFindByCpf({ empty: false });

        const result = await getClientByCpfUseCase.execute('12345678900');

        expect(result).toMatchObject({
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
        });
        expect(findByCpfMock).toHaveBeenCalledWith('12345678900');
    });

    it('should throw NotFoundError if client does not exist', async () => {
        clientMock.mockClientFindByCpf({ empty: true });

        await expect(getClientByCpfUseCase.execute('99999999999')).rejects.toThrow(NotFoundError);
    });
});
