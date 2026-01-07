import { describe, expect, it } from 'vitest';

import { DeleteClient } from '#/application/use-cases/client/delete-client/delete-client';
import { NotFoundError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';

describe('delete-client', () => {
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const deleteClientUseCase = new DeleteClient(clientRepository);

    it('should delete a client', async () => {
        clientMock.mockClientFindByCpf({ empty: false });
        const destroyMock = clientMock.mockClientDestroy();

        await deleteClientUseCase.execute('12345678900');

        expect(destroyMock).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError if client does not exist', async () => {
        clientMock.mockClientFindByCpf({ empty: true });

        await expect(deleteClientUseCase.execute('99999999999')).rejects.toThrow(NotFoundError);
    });
});
