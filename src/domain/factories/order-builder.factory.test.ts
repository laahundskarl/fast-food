import { OrderStatus } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { OrderBuilderFactory } from '#/domain/factories/order-builder.factory';

describe('order-builder-factory', () => {
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
    describe('buildOrderProducts', () => {
        it('should build order products with one product', () => {
            const orderProducts = OrderBuilderFactory.buildOrderProducts(
                [{ productId: '1', quantity: 1 }],
                [mockProduct],
            );

            expect(orderProducts.orderProducts).toMatchObject([
                {
                    amount: 1,
                    value: 100,
                    product: mockProduct,
                },
            ]);
            expect(orderProducts.totalValue).toBe(100);
        });

        it('should build order products with two products', () => {
            const mockProduct1 = {
                id: '1',
                name: 'Product 1',
                description: 'Product 1 description',
                value: 100,
                category: {
                    id: '1',
                    name: 'Category 1',
                },
            };

            const mockProduct2 = {
                id: '2',
                name: 'Product 2',
                description: 'Product 2 description',
                value: 200,
                category: {
                    id: '2',
                    name: 'Category 2',
                },
            };

            const orderProducts = OrderBuilderFactory.buildOrderProducts(
                [
                    { productId: '1', quantity: 1 },
                    { productId: '2', quantity: 2 },
                ],
                [mockProduct1, mockProduct2],
            );

            expect(orderProducts.totalValue).toBe(500);
            expect(orderProducts.orderProducts).toMatchObject([
                {
                    amount: 1,
                    value: 100,
                    product: mockProduct1,
                },
                {
                    amount: 2,
                    value: 400,
                    product: mockProduct2,
                },
            ]);
        });

        it('should throw an error if the product is not found', () => {
            expect(() => {
                OrderBuilderFactory.buildOrderProducts([{ productId: '1', quantity: 1 }], []);
            }).toThrow('Product with id 1 not found');
        });
    });

    describe('createOrder', () => {
        it('should create an order', () => {
            const orderProducts = OrderBuilderFactory.buildOrderProducts(
                [{ productId: '1', quantity: 1 }],
                [mockProduct],
            );
            const order = OrderBuilderFactory.createOrder(orderProducts.orderProducts, orderProducts.totalValue);
            expect(order).toMatchObject({
                value: 100,
                orderNumber: 0,
                status: OrderStatus.WAITING,
                orderProducts: orderProducts.orderProducts,
            });
        });
    });
});
