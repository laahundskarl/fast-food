import { describe, expect, it } from 'vitest';

import { DeleteOrder } from '#/application/use-cases/order/delete-order/delete-order';
import { NotFoundError } from '#/domain/errors';
import * as orderMock from '#/infrastructure/repositories/prisma/mocks/prisma-order-mock.repository';

describe('delete-order', () => {
    const orderRepository = new orderMock.PrismaOrderMockRepository();
    const deleteOrderUseCase = new DeleteOrder(orderRepository);

    it('should delete an order', async () => {
        orderMock.mockOrderFindById({ empty: false });
        const destroyMock = orderMock.mockOrderDestroy();

        await deleteOrderUseCase.execute('1');

        expect(destroyMock).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError if order does not exist', async () => {
        orderMock.mockOrderFindById({ empty: true });

        await expect(deleteOrderUseCase.execute('999')).rejects.toThrow(NotFoundError);
    });
});
