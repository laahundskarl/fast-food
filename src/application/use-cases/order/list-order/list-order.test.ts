import { describe, expect, it } from 'vitest';

import { ListOrder } from '#/application/use-cases/order/list-order/list-order';
import * as orderMock from '#/infrastructure/repositories/prisma/mocks/prisma-order-mock.repository';

describe('list-order', () => {
    const orderRepository = new orderMock.PrismaOrderMockRepository();
    const listOrderUseCase = new ListOrder(orderRepository);

    it('should list orders', async () => {
        const listMock = orderMock.mockOrderList({});

        const result = await listOrderUseCase.execute({ page: '1', limit: '10' });

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            id: '1',
            value: 25.99,
            orderNumber: 1001,
            status: 'WAITING',
        });
        expect(listMock).toHaveBeenCalled();
    });

    it('should list orders with status filter', async () => {
        const listMock = orderMock.mockOrderList({});

        const result = await listOrderUseCase.execute({ status: 'WAITING,RECEIVED', page: '1', limit: '10' });

        expect(result).toHaveLength(1);
        expect(listMock).toHaveBeenCalledWith({
            status: ['WAITING', 'RECEIVED'],
            clientId: undefined,
            productId: undefined,
            page: 1,
            limit: 10,
            paymentStatus: undefined,
        });
    });

    it('should return empty array when no orders exist', async () => {
        orderMock.mockOrderList({ data: [] });

        const result = await listOrderUseCase.execute({ page: '1', limit: '10' });

        expect(result).toHaveLength(0);
    });
});
