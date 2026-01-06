import { describe, expect, it } from 'vitest';

import { GetOrder } from '#/application/use-cases/order/get-order/get-order';
import { NotFoundError } from '#/domain/errors';
import * as orderMock from '#/infrastructure/repositories/prisma/mocks/prisma-order-mock.repository';

describe('get-order', () => {
    const orderRepository = new orderMock.PrismaOrderMockRepository();
    const getOrderUseCase = new GetOrder(orderRepository);

    it('should get an order by id', async () => {
        const findByIdMock = orderMock.mockOrderFindById({ empty: false });

        const result = await getOrderUseCase.execute('1');

        expect(result).toMatchObject({
            id: '1',
            value: 25.99,
            orderNumber: 1001,
            status: 'WAITING',
        });
        expect(findByIdMock).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError if order does not exist', async () => {
        orderMock.mockOrderFindById({ empty: true });

        await expect(getOrderUseCase.execute('999')).rejects.toThrow(NotFoundError);
    });
});
