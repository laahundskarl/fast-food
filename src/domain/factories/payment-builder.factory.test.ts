import { describe, expect, it } from 'vitest';

import { OrderStatus, StatusPayment } from '@prisma/client';

import { Order } from '#/domain/entities/order.entity';
import { PaymentBuilderFactory } from '#/domain/factories/payment-builder.factory';

describe('payment-builder-factory', () => {
    const mockProduct = {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        value: 100,
        category: {
            id: '1',
            name: 'Category 1',
        },
    };

    const mockOrderProduct = {
        id: 'op-1',
        amount: 2,
        value: 200,
        product: mockProduct,
    };

    const mockOrder = new Order({
        id: 'order-1',
        value: 200,
        orderNumber: 1,
        status: OrderStatus.WAITING,
        orderProducts: [mockOrderProduct],
        payments: [],
    });

    describe('createPayment', () => {
        it('should create a payment with PENDING status', () => {
            const payment = PaymentBuilderFactory.createPayment(mockOrder);

            expect(payment).toMatchObject({
                status: StatusPayment.PENDING,
                order: mockOrder,
            });
            expect(payment.id).toBeDefined();
        });

        it('should create a payment with the order attached', () => {
            const payment = PaymentBuilderFactory.createPayment(mockOrder);

            expect(payment.order).toBe(mockOrder);
            expect(payment.order?.value).toBe(200);
            expect(payment.order?.orderProducts).toHaveLength(1);
        });
    });

    describe('buildGatewayRequest', () => {
        it('should build gateway request with correct paymentId, items and amount', () => {
            const paymentId = 'payment-123';
            const gatewayRequest = PaymentBuilderFactory.buildGatewayRequest(paymentId, mockOrder);

            expect(gatewayRequest).toMatchObject({
                paymentId: 'payment-123',
                items: mockOrder.orderProducts,
                amount: 200,
            });
        });

        it('should include all order products as items', () => {
            const orderWithMultipleProducts = new Order({
                id: 'order-2',
                value: 500,
                orderNumber: 2,
                status: OrderStatus.WAITING,
                orderProducts: [
                    mockOrderProduct,
                    {
                        id: 'op-2',
                        amount: 3,
                        value: 300,
                        product: {
                            id: '2',
                            name: 'Product 2',
                            description: 'Product 2 description',
                            value: 100,
                            category: {
                                id: '1',
                                name: 'Category 1',
                            },
                        },
                    },
                ],
                payments: [],
            });

            const gatewayRequest = PaymentBuilderFactory.buildGatewayRequest('payment-456', orderWithMultipleProducts);

            expect(gatewayRequest.items).toHaveLength(2);
            expect(gatewayRequest.amount).toBe(500);
        });
    });
});
