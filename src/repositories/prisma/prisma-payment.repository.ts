import { PrismaClient, StatusPayment } from '@prisma/client';

import { PaymentListDto, PaymentUpdateDto } from '#/dto/payment.dto';
import { CreatePayment, Payment } from '#/entities/payment.entity';
import { NotFoundError } from '#/errors/app-error';
import { PrismaPaymentMapper } from '#/mappers/prisma/prisma-payment.mapper';
import { IPaymentRepository } from '#/repositories/payment.repository';

export class PrismaPaymentRepository implements IPaymentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(payment: CreatePayment): Promise<Payment> {
        const data = await this.prisma.payment.create({
            data: PrismaPaymentMapper.toCreate(payment),
            include: {
                order: true,
            },
        });

        return PrismaPaymentMapper.toDomain(data);
    }
    async update(id: string, payment: PaymentUpdateDto): Promise<Payment> {
        return this.prisma.payment.update({
            where: { id },
            data: PrismaPaymentMapper.toUpdate(payment),
            include: {
                order: true,
            },
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
            include: {
                order: true,
            },
        });
    }

    async cancelPayment(id: string): Promise<void> {
        await this.prisma.payment.update({
            where: { id },
            data: { status: StatusPayment.CANCELED },
        });
    }
}
