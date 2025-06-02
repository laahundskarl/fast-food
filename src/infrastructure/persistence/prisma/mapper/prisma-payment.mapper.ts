import { Prisma } from '@prisma/client';

import { Payment } from '#/core/domain/entities/payment.entity';

export class PrismaPaymentMapper {
    static toDomain(data: Prisma.PaymentGetPayload<{ include: { order: true } }>): Payment {
        return new Payment(data.externalReference, data.qrCode, data.status, data.id);
    }

    static toUpdate(data: Payment): Prisma.PaymentUpdateInput {
        return {
            externalReference: data.externalReference,
            qrCode: data.qrCode,
            status: data.status,
        };
    }
}
