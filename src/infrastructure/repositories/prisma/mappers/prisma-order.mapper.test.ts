import { OrderStatus, StatusPayment } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { Client } from '#/domain/entities/client.entity';
import { OrderProduct } from '#/domain/entities/order-product.entity';
import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { Product } from '#/domain/entities/product.entity';
import { PrismaOrderMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-order.mapper';

describe('PrismaOrderMapper', () => {
    const mockCategory = {
        id: 'category-123',
        name: 'Beverages',
    };

    const mockProduct = {
        id: 'product-123',
        name: 'Coca-Cola',
        value: 5.99,
        description: 'Refreshing soft drink',
        category: mockCategory,
    };

    const mockOrderProduct = {
        id: 'order-product-123',
        amount: 2,
        value: 11.98,
        product: mockProduct,
    };

    const mockPayment = {
        id: 'payment-123',
        status: StatusPayment.PENDING,
        externalReference: 'ext-ref-123',
        qrCode: 'qr-code-data',
    };

    const mockClient = {
        id: 'client-123',
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com',
    };

    const mockOrderData = {
        id: 'order-123',
        value: 11.98,
        orderNumber: 1001,
        status: OrderStatus.WAITING,
        orderProducts: [mockOrderProduct],
        payments: [mockPayment],
        client: mockClient,
    };

    describe('toDomain', () => {
        it('should map prisma order data to domain Order entity', () => {
            const order = PrismaOrderMapper.toDomain(mockOrderData);

            expect(order).toBeInstanceOf(Order);
            expect(order.id).toBe(mockOrderData.id);
            expect(order.value).toBe(mockOrderData.value);
            expect(order.orderNumber).toBe(mockOrderData.orderNumber);
            expect(order.status).toBe(mockOrderData.status);
            expect(order.orderProducts).toHaveLength(1);
            expect(order.payments).toHaveLength(1);
            expect(order.client).toBeDefined();
            expect(order.client?.id).toBe(mockClient.id);
        });

        it('should map prisma order data without client', () => {
            const orderDataWithoutClient = {
                ...mockOrderData,
                client: undefined,
            };

            const order = PrismaOrderMapper.toDomain(orderDataWithoutClient);

            expect(order).toBeInstanceOf(Order);
            expect(order.client).toBeUndefined();
        });

        it('should map prisma order data with empty orderProducts and payments', () => {
            const orderDataEmpty = {
                id: 'order-456',
                value: 0,
                orderNumber: 1002,
                status: OrderStatus.WAITING,
            };

            const order = PrismaOrderMapper.toDomain(orderDataEmpty);

            expect(order).toBeInstanceOf(Order);
            expect(order.orderProducts).toEqual([]);
            expect(order.payments).toEqual([]);
        });
    });

    describe('toDomainSimple', () => {
        it('should map prisma order data to simple domain Order entity', () => {
            const order = PrismaOrderMapper.toDomainSimple(mockOrderData);

            expect(order).toBeInstanceOf(Order);
            expect(order.id).toBe(mockOrderData.id);
            expect(order.value).toBe(mockOrderData.value);
            expect(order.orderNumber).toBe(mockOrderData.orderNumber);
            expect(order.status).toBe(mockOrderData.status);
            expect(order.orderProducts).toEqual([]);
            expect(order.payments).toEqual([]);
            expect(order.client).toBeUndefined();
        });
    });

    describe('toCreate', () => {
        it('should map domain Order to Prisma create input', () => {
            const category = new ProductCategory({ id: 'category-123', name: 'Beverages' });
            const product = new Product({
                id: 'product-123',
                name: 'Coca-Cola',
                value: 5.99,
                description: 'Refreshing soft drink',
                category,
            });
            const orderProduct = new OrderProduct({
                amount: 2,
                value: 11.98,
                product,
            });
            const payment = new Payment({
                status: StatusPayment.PENDING,
                externalReference: 'ext-ref-123',
                qrCode: 'qr-code-data',
            });
            const client = new Client({
                id: 'client-123',
                name: 'John Doe',
                cpf: '12345678901',
                email: 'john@example.com',
            });
            const order = new Order({
                value: 11.98,
                orderNumber: 1001,
                status: OrderStatus.WAITING,
                orderProducts: [orderProduct],
                payments: [payment],
                client,
            });

            const createInput = PrismaOrderMapper.toCreate(order);

            expect(createInput.value).toBe(11.98);
            expect(createInput.client).toEqual({ connect: { id: 'client-123' } });
            expect(createInput.orderProducts).toBeDefined();
            expect(createInput.payments).toBeDefined();
        });

        it('should map domain Order without client to Prisma create input', () => {
            const order = new Order({
                value: 11.98,
                orderNumber: 1001,
                status: OrderStatus.WAITING,
                orderProducts: [],
                payments: [],
            });

            const createInput = PrismaOrderMapper.toCreate(order);

            expect(createInput.value).toBe(11.98);
            expect(createInput.client).toBeUndefined();
        });
    });

    describe('toUpdateOrderProducts', () => {
        it('should map domain Order to Prisma update input for order products', () => {
            const category = new ProductCategory({ id: 'category-123', name: 'Beverages' });
            const product = new Product({
                id: 'product-123',
                name: 'Coca-Cola',
                value: 5.99,
                description: 'Refreshing soft drink',
                category,
            });
            const orderProduct = new OrderProduct({
                amount: 3,
                value: 17.97,
                product,
            });
            const client = new Client({
                id: 'client-123',
                name: 'John Doe',
                cpf: '12345678901',
                email: 'john@example.com',
            });
            const order = new Order({
                id: 'order-123',
                value: 17.97,
                orderNumber: 1001,
                status: OrderStatus.WAITING,
                orderProducts: [orderProduct],
                client,
            });

            const updateInput = PrismaOrderMapper.toUpdateOrderProducts(order);

            expect(updateInput.value).toBe(17.97);
            expect(updateInput.status).toBe(OrderStatus.WAITING);
            expect(updateInput.client).toEqual({ connect: { id: 'client-123' } });
            expect(updateInput.orderProducts).toEqual({
                deleteMany: {},
                create: [
                    {
                        amount: 3,
                        value: 17.97,
                        product: { connect: { id: 'product-123' } },
                    },
                ],
            });
        });

        it('should map domain Order without client to Prisma update input', () => {
            const order = new Order({
                id: 'order-123',
                value: 0,
                orderNumber: 1001,
                status: OrderStatus.WAITING,
                orderProducts: [],
            });

            const updateInput = PrismaOrderMapper.toUpdateOrderProducts(order);

            expect(updateInput.value).toBe(0);
            expect(updateInput.client).toBeUndefined();
            expect(updateInput.orderProducts).toEqual({
                deleteMany: {},
                create: [],
            });
        });
    });
});
