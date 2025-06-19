import { Prisma } from '@prisma/client';

import { Payment } from '#/entities/payment.entity';
import { PrismaOrderMapper } from '#/mappers/prisma/prisma-order.mapper';

export class PrismaPaymentMapper {
    static toDomain(data: Prisma.PaymentGetPayload<{ include: { order: true } }>): Payment {
        return new Payment({
            externalReference: data.externalReference,
            qrCode: data.qrCode,
            status: data.status,
            id: data.id,
            order: PrismaOrderMapper.toDomainWithoutRelations(data.order),
        });
    }

    static toUpdate(data: Payment): Prisma.PaymentUpdateInput {
        return {
            externalReference: data.externalReference,
            qrCode: data.qrCode,
            status: data.status,
        };
    }
}
