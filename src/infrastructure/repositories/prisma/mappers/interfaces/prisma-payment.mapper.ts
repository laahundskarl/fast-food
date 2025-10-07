import { Payment as PrismaPayment } from '@prisma/client';

import { IPayment } from '#/domain/entities/payment.entity';

export interface IPrismaPaymentMapper {
    toCreate(payment: IPayment): Omit<PrismaPayment, 'createdAt' | 'updatedAt'>;
    toUpdate(payment: IPayment): Omit<PrismaPayment, 'createdAt' | 'updatedAt'>;
    toDomain(payment: PrismaPayment & { order?: any }): IPayment;
    toDomainSimple(payment: PrismaPayment): IPayment;
}
