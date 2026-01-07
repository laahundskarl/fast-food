import { OrderStatus } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { UpdateOrderStatus } from '#/application/use-cases/order/update-order-status/update-order-status';
import { Order } from '#/domain/entities/order.entity';
import { BusinessError, NotFoundError } from '#/domain/errors';
import * as orderMock from '#/infrastructure/repositories/prisma/mocks/prisma-order-mock.repository';

describe('update-order-status', () => {
    const orderRepository = new orderMock.PrismaOrderMockRepository();
    const updateOrderStatusUseCase = new UpdateOrderStatus(orderRepository);

    it('should update order status from WAITING to RECEIVED', async () => {
        const existingOrder = new Order({
            id: 'order-1',
            value: 25.99,
            orderNumber: 1001,
            status: OrderStatus.WAITING,
            orderProducts: [],
        });
        orderMock.mockOrderFindById({ data: existingOrder });

        const updatedOrder = new Order({
            id: 'order-1',
            value: 25.99,
            orderNumber: 1001,
            status: OrderStatus.RECEIVED,
            orderProducts: [],
        });
        const updateMock = orderMock.mockOrderUpdateStatus({ data: updatedOrder });

        const result = await updateOrderStatusUseCase.execute('order-1', OrderStatus.RECEIVED);

        expect(result).toMatchObject({
            id: 'order-1',
            status: 'RECEIVED',
        });
        expect(updateMock).toHaveBeenCalled();
    });

    it('should update order status from RECEIVED to IN_PROGRESS', async () => {
        const existingOrder = new Order({
            id: 'order-1',
            value: 25.99,
            orderNumber: 1001,
            status: OrderStatus.RECEIVED,
            orderProducts: [],
        });
        orderMock.mockOrderFindById({ data: existingOrder });

        const updatedOrder = new Order({
            id: 'order-1',
            value: 25.99,
            orderNumber: 1001,
            status: OrderStatus.IN_PROGRESS,
            orderProducts: [],
        });
        orderMock.mockOrderUpdateStatus({ data: updatedOrder });

        const result = await updateOrderStatusUseCase.execute('order-1', OrderStatus.IN_PROGRESS);

        expect(result).toMatchObject({
            status: 'IN_PROGRESS',
        });
    });

    it('should throw NotFoundError if order does not exist', async () => {
        orderMock.mockOrderFindById({ empty: true });

        await expect(updateOrderStatusUseCase.execute('999', OrderStatus.RECEIVED)).rejects.toThrow(NotFoundError);
    });

    it('should throw BusinessError for invalid status transition', async () => {
        const existingOrder = new Order({
            id: 'order-1',
            value: 25.99,
            orderNumber: 1001,
            status: OrderStatus.WAITING,
            orderProducts: [],
        });
        orderMock.mockOrderFindById({ data: existingOrder });

        await expect(updateOrderStatusUseCase.execute('order-1', OrderStatus.FINISHED)).rejects.toThrow(BusinessError);
    });
});
