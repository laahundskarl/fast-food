import { OrderStatus } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { UpdateOrder } from '#/application/use-cases/order/update-order/update-order';
import { Order } from '#/domain/entities/order.entity';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { Product } from '#/domain/entities/product.entity';
import { BusinessError, NotFoundError } from '#/domain/errors';
import * as orderMock from '#/infrastructure/repositories/prisma/mocks/prisma-order-mock.repository';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';

describe('update-order', () => {
    const orderRepository = new orderMock.PrismaOrderMockRepository();
    const productRepository = new productMock.PrismaProductMockRepository();
    const updateOrderUseCase = new UpdateOrder(orderRepository, productRepository);

    const categoryMock = new ProductCategory({
        id: '1',
        name: 'Beverages',
    });

    const existingProduct = new Product({
        id: 'product-1',
        name: 'Coca-Cola',
        value: 5.99,
        description: 'Refreshing beverage',
        category: categoryMock,
    });

    const existingOrder = new Order({
        id: 'order-1',
        value: 11.98,
        orderNumber: 1001,
        status: OrderStatus.WAITING,
        orderProducts: [],
    });

    it('should update order products', async () => {
        orderMock.mockOrderFindById({ data: existingOrder });
        productMock.mockProductFindMany({ data: [existingProduct] });

        const updatedOrder = new Order({
            id: 'order-1',
            value: 17.97,
            orderNumber: 1001,
            status: OrderStatus.WAITING,
            orderProducts: [],
        });
        const updateMock = orderMock.mockOrderUpdateOrderProducts({ data: updatedOrder });

        const result = await updateOrderUseCase.execute('order-1', {
            orderProducts: [{ productId: 'product-1', quantity: 3 }],
        });

        expect(result).toMatchObject({
            id: 'order-1',
            value: 17.97,
        });
        expect(updateMock).toHaveBeenCalled();
    });

    it('should return existing order when no orderProducts provided', async () => {
        orderMock.mockOrderFindById({ data: existingOrder });

        const result = await updateOrderUseCase.execute('order-1', {});

        expect(result).toMatchObject({
            id: 'order-1',
            value: 11.98,
        });
    });

    it('should throw NotFoundError if order does not exist', async () => {
        orderMock.mockOrderFindById({ empty: true });

        await expect(
            updateOrderUseCase.execute('999', {
                orderProducts: [{ productId: 'product-1', quantity: 1 }],
            }),
        ).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError if product does not exist', async () => {
        orderMock.mockOrderFindById({ data: existingOrder });
        productMock.mockProductFindMany({ data: [] });

        await expect(
            updateOrderUseCase.execute('order-1', {
                orderProducts: [{ productId: 'non-existent', quantity: 1 }],
            }),
        ).rejects.toThrow(NotFoundError);
    });

    it('should throw BusinessError if quantity is zero or negative', async () => {
        orderMock.mockOrderFindById({ data: existingOrder });
        productMock.mockProductFindMany({ data: [existingProduct] });

        await expect(
            updateOrderUseCase.execute('order-1', {
                orderProducts: [{ productId: 'product-1', quantity: 0 }],
            }),
        ).rejects.toThrow(BusinessError);
    });
});
