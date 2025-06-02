import { PrismaClient } from '@prisma/client';

import { Payment } from '#/core/domain/entities/payment.entity';
import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { PaymentCreateDTO } from '#/infrastructure/adapters/dto/payment.dto';
import { PrismaPaymentMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-payment.mapper';

export class PrismaPaymentRepository implements PaymentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(payment: Payment): Promise<Payment> {
        return this.prisma.payment.create({
            data: PrismaPaymentMapper.toCreate(payment),
        });
    }
}
