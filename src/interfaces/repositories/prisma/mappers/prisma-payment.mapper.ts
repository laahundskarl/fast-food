import { Prisma } from '@prisma/client';

import { Payment } from '#/domain/entities/payment.entity';
import { PrismaOrderMapper } from '#/interfaces/repositories/prisma/mappers/prisma-order.mapper';

export class PrismaPaymentMapper {
    static toDomain(data: any): Payment {
        return new Payment({
            id: data.id,
            status: data.status,
            externalReference: data.externalReference || undefined,
            qrCode: data.qrCode || undefined,
            order: data.order ? PrismaOrderMapper.toDomainSimple(data.order) : undefined,
        });
    }

    static toDomainSimple(data: any): Payment {
        return new Payment({
            id: data.id,
            status: data.status,
            externalReference: data.externalReference || undefined,
            qrCode: data.qrCode || undefined,
        });
    }

    static toCreate(payment: Payment): Prisma.PaymentCreateInput {
        if (!payment.order?.id) {
            throw new Error('Payment must be associated with an order');
        }
        return {
            status: payment.status,
            externalReference: payment.externalReference,
            qrCode: payment.qrCode,
            order: {
                connect: { id: payment.order.id },
            },
        };
    }

    static toUpdate(payment: Payment): Prisma.PaymentUpdateInput {
        return {
            status: payment.status,
            externalReference: payment.externalReference,
            qrCode: payment.qrCode,
        };
    }
}
