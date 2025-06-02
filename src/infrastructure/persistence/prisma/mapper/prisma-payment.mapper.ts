import { Prisma } from '@prisma/client';

import { Payment } from '#/core/domain/entities/payment.entity';
import { PrismaOrderMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-order.mapper';

export class PrismaPaymentMapper {
    static toDomain(data: Prisma.PaymentGetPayload<{ include: { order: true } }>): Payment {
        return new Payment(
            data.externalReference,
            data.qrCode,
            data.status,
            data.id,
            PrismaOrderMapper.toDomainWithoutRelations(data.order),
        );
    }

    static toUpdate(data: Payment): Prisma.PaymentUpdateInput {
        return {
            externalReference: data.externalReference,
            qrCode: data.qrCode,
            status: data.status,
        };
    }
}
