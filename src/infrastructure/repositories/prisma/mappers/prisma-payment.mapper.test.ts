import { OrderStatus, StatusPayment } from '@prisma/client';
import { describe, expect, it } from 'vitest';

import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { PrismaPaymentMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-payment.mapper';

describe('PrismaPaymentMapper', () => {
    const mockOrder = {
        id: 'order-123',
        value: 25.99,
        orderNumber: 1001,
        status: OrderStatus.WAITING,
    };

    const mockPaymentData = {
        id: 'payment-123',
        status: StatusPayment.PENDING,
        externalReference: 'ext-ref-123',
        qrCode: 'qr-code-data',
        order: mockOrder,
    };

    describe('toDomain', () => {
        it('should map prisma payment data to domain Payment entity', () => {
            const payment = PrismaPaymentMapper.toDomain(mockPaymentData);

            expect(payment).toBeInstanceOf(Payment);
            expect(payment.id).toBe(mockPaymentData.id);
            expect(payment.status).toBe(mockPaymentData.status);
            expect(payment.externalReference).toBe(mockPaymentData.externalReference);
            expect(payment.qrCode).toBe(mockPaymentData.qrCode);
            expect(payment.order).toBeDefined();
            expect(payment.order?.id).toBe(mockOrder.id);
        });

        it('should map prisma payment data without order', () => {
            const paymentDataWithoutOrder = {
                ...mockPaymentData,
                order: undefined,
            };

            const payment = PrismaPaymentMapper.toDomain(paymentDataWithoutOrder);

            expect(payment).toBeInstanceOf(Payment);
            expect(payment.order).toBeUndefined();
        });

        it('should map prisma payment data with null externalReference and qrCode', () => {
            const paymentDataWithNulls = {
                id: 'payment-456',
                status: StatusPayment.PENDING,
                externalReference: null,
                qrCode: null,
            };

            const payment = PrismaPaymentMapper.toDomain(paymentDataWithNulls);

            expect(payment).toBeInstanceOf(Payment);
            expect(payment.externalReference).toBeNull();
            expect(payment.qrCode).toBeNull();
        });
    });

    describe('toDomainSimple', () => {
        it('should map prisma payment data to simple domain Payment entity', () => {
            const payment = PrismaPaymentMapper.toDomainSimple(mockPaymentData);

            expect(payment).toBeInstanceOf(Payment);
            expect(payment.id).toBe(mockPaymentData.id);
            expect(payment.status).toBe(mockPaymentData.status);
            expect(payment.externalReference).toBe(mockPaymentData.externalReference);
            expect(payment.qrCode).toBe(mockPaymentData.qrCode);
            expect(payment.order).toBeUndefined();
        });
    });

    describe('toCreate', () => {
        it('should map domain Payment to Prisma create input', () => {
            const order = new Order({
                id: 'order-123',
                value: 25.99,
                orderNumber: 1001,
                status: OrderStatus.WAITING,
            });
            const payment = new Payment({
                status: StatusPayment.PENDING,
                externalReference: 'ext-ref-123',
                qrCode: 'qr-code-data',
                order,
            });

            const createInput = PrismaPaymentMapper.toCreate(payment);

            expect(createInput).toEqual({
                status: StatusPayment.PENDING,
                externalReference: 'ext-ref-123',
                qrCode: 'qr-code-data',
                order: {
                    connect: { id: 'order-123' },
                },
            });
        });

        it('should throw error when payment has no associated order', () => {
            const payment = new Payment({
                status: StatusPayment.PENDING,
                externalReference: 'ext-ref-123',
                qrCode: 'qr-code-data',
            });

            expect(() => PrismaPaymentMapper.toCreate(payment)).toThrow('Payment must be associated with an order');
        });
    });

    describe('toUpdate', () => {
        it('should map domain Payment to Prisma update input', () => {
            const payment = new Payment({
                id: 'payment-123',
                status: StatusPayment.APPROVED,
                externalReference: 'ext-ref-updated',
                qrCode: 'qr-code-updated',
            });

            const updateInput = PrismaPaymentMapper.toUpdate(payment);

            expect(updateInput).toEqual({
                status: StatusPayment.APPROVED,
                externalReference: 'ext-ref-updated',
                qrCode: 'qr-code-updated',
            });
        });

        it('should map domain Payment with null values to Prisma update input', () => {
            const payment = new Payment({
                id: 'payment-123',
                status: StatusPayment.APPROVED,
            });

            const updateInput = PrismaPaymentMapper.toUpdate(payment);

            expect(updateInput).toEqual({
                status: StatusPayment.APPROVED,
                externalReference: null,
                qrCode: null,
            });
        });
    });
});
