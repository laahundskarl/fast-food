import { PrismaClient } from '@prisma/client';

import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { Payment } from '#/domain/entities/payment.entity';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { PrismaPaymentMapper } from '#/interfaces/repositories/prisma/mappers/prisma-payment.mapper';

export class PrismaPaymentRepository implements IPaymentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: string): Promise<Payment | null> {
        const data = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                order: true,
            },
        });
        if (!data) return null;
        return PrismaPaymentMapper.toDomain(data);
    }

    async list(query?: ListPaymentDto): Promise<Payment[]> {
        const data = await this.prisma.payment.findMany({
            where: query,
        });
        return data.map(item => PrismaPaymentMapper.toDomainSimple(item));
    }

    async update(id: string, payment: Payment): Promise<Payment> {
        return this.prisma.payment.update({
            where: { id },
            data: PrismaPaymentMapper.toUpdate(payment),
        });
    }
}
