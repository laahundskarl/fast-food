import { Prisma } from '@prisma/client';

import { CreatePayment, Payment } from '#/entities/payment.entity';
import { PrismaOrderMapper } from '#/mappers/prisma/prisma-order.mapper';
import { PaymentUpdateDto } from '#/dto/payment.dto';

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

    static toUpdate(data: PaymentUpdateDto): Prisma.PaymentUpdateInput {
        return {
            externalReference: data.externalReference,
            qrCode: data.qrCode,
            status: data.status,
        };
    }

    static toCreate(data: CreatePayment): Prisma.PaymentCreateInput {
        return {
            externalReference: data.externalReference,
            qrCode: data.qrCode,
            order: { connect: { id: data.orderId } },
        };
    }
}
