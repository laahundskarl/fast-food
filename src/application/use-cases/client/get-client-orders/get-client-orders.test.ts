import { describe, expect, it } from 'vitest';

import { GetClientOrders } from '#/application/use-cases/client/get-client-orders/get-client-orders';
import { Client } from '#/domain/entities/client.entity';
import { NotFoundError } from '#/domain/errors';
import * as clientMock from '#/infrastructure/repositories/prisma/mocks/prisma-client-mock.repository';

describe('get-client-orders', () => {
    const clientRepository = new clientMock.PrismaClientMockRepository();
    const getClientOrdersUseCase = new GetClientOrders(clientRepository);

    it('should get client with orders', async () => {
        const clientWithOrders = new Client({
            id: '1',
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
            orders: [],
        });
        const findByCpfMock = clientMock.mockClientFindByCpf({ data: clientWithOrders });

        const result = await getClientOrdersUseCase.execute('12345678900', ['orders']);

        expect(result).toMatchObject({
            name: 'John Doe',
            cpf: '12345678900',
            email: 'john.doe@example.com',
            orders: [],
        });
        expect(findByCpfMock).toHaveBeenCalledWith('12345678900', ['orders']);
    });

    it('should throw NotFoundError if client does not exist', async () => {
        clientMock.mockClientFindByCpf({ empty: true });

        await expect(getClientOrdersUseCase.execute('99999999999', ['orders'])).rejects.toThrow(NotFoundError);
    });
});
