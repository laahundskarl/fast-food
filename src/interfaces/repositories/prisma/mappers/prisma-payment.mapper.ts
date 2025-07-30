import { Prisma } from '@prisma/client';

import { Payment } from '#/domain/entities/payment.entity';
import { PrismaOrderMapper } from '#/interfaces/repositories/prisma/mappers/prisma-order.mapper';

export class PrismaPaymentMapper {
    static toDomain(data: any): Payment {
        return new Payment({
            id: data.id,
            status: data.status,
            order: PrismaOrderMapper.toDomainSimple(data.order),
            externalReference: data.externalReference,
            qrCode: data.qrCode,
        });
    }

    static toDomainSimple(data: any): Payment {
        return new Payment({
            id: data.id,
            status: data.status,
            externalReference: data.externalReference,
            qrCode: data.qrCode,
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
