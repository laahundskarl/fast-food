import { PrismaClient } from '@prisma/client';

import { Payment } from '#/core/domain/entities/payment.entity';
import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { PaymentListDto } from '#/infrastructure/adapters/dto/payment.dto';
import { PrismaPaymentMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-payment.mapper';

export class PrismaPaymentRepository implements PaymentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async update(id: string, payment: Payment): Promise<Payment> {
        return this.prisma.payment.update({
            where: { id },
            data: PrismaPaymentMapper.toUpdate(payment),
        });
    }

    async findById(id: string): Promise<Payment> {
        const data = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                order: true,
            },
        });
        if (!data) {
            throw new NotFoundError('Payment not found');
        }
        return PrismaPaymentMapper.toDomain(data);
    }

    async list(query?: PaymentListDto): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: query,
        });
    }
}
