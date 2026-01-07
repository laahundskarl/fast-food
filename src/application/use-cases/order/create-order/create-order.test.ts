import { OrderStatus, StatusPayment } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import * as orchestrationMocks from '#/application/orchestration/mocks/orchestration-mocks';
import { CreateOrder } from '#/application/use-cases/order/create-order/create-order';
import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { Product } from '#/domain/entities/product.entity';
import * as orderMock from '#/infrastructure/repositories/prisma/mocks/prisma-order-mock.repository';

describe('create-order', () => {
    const orderRepository = new orderMock.PrismaOrderMockRepository();
    const productOrchestration = new orchestrationMocks.ProductOrchestrationMock();
    const clientOrchestration = new orchestrationMocks.ClientOrchestrationMock();
    const paymentOrchestration = new orchestrationMocks.PaymentOrchestrationMock();

    const createOrderUseCase = new CreateOrder(
        orderRepository,
        productOrchestration,
        clientOrchestration,
        paymentOrchestration,
    );

    const categoryMock = new ProductCategory({
        id: '1',
        name: 'Beverages',
    });

    const productMock = new Product({
        id: 'product-1',
        name: 'Coca-Cola',
        value: 5.99,
        description: 'Refreshing beverage',
        category: categoryMock,
    });

    const paymentMock = new Payment({
        id: 'payment-1',
        status: StatusPayment.PENDING,
    });

    it('should create an order', async () => {
        orchestrationMocks.mockValidateAndGetProducts({ data: [productMock] });
        orchestrationMocks.mockGetClientIfExists({ empty: true });
        orchestrationMocks.mockCreatePaymentForOrder({ data: paymentMock });

        const savedOrder = new Order({
            id: 'order-1',
            value: 11.98,
            orderNumber: 1001,
            status: OrderStatus.WAITING,
            orderProducts: [],
        });
        orderMock.mockOrderCreate({ data: savedOrder });

        const result = await createOrderUseCase.execute({
            orderProducts: [{ productId: 'product-1', quantity: 2 }],
            clientId: 'client-1',
        });

        expect(result).toMatchObject({
            id: 'order-1',
            value: 11.98,
            orderNumber: 1001,
            status: 'WAITING',
        });
        expect(result.payments).toHaveLength(1);
    });

    it('should create an order with a client', async () => {
        orchestrationMocks.mockValidateAndGetProducts({ data: [productMock] });
        orchestrationMocks.mockGetClientIfExists({ empty: false });
        orchestrationMocks.mockCreatePaymentForOrder({ data: paymentMock });

        const savedOrder = new Order({
            id: 'order-1',
            value: 5.99,
            orderNumber: 1002,
            status: OrderStatus.WAITING,
            orderProducts: [],
        });
        orderMock.mockOrderCreate({ data: savedOrder });

        const result = await createOrderUseCase.execute({
            orderProducts: [{ productId: 'product-1', quantity: 1 }],
            clientId: 'client-1',
        });

        expect(result).toMatchObject({
            id: 'order-1',
            status: 'WAITING',
        });
    });
});
