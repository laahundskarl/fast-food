import { PrismaClient } from '@prisma/client';

import { PaymentListDto } from '#/dto/payment.dto';
import { Payment } from '#/entities/payment.entity';
import { NotFoundError } from '#/errors/app-error';
import { PrismaPaymentMapper } from '#/mappers/prisma/prisma-payment.mapper';
import { IPaymentRepository } from '#/repositories/payment.repository';

export class PrismaPaymentRepository implements IPaymentRepository {
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
