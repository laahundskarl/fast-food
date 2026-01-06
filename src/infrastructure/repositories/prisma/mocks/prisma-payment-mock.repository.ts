import { StatusPayment } from '@prisma/client';
import { vi } from 'vitest';

import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IPayment, Payment } from '#/domain/entities/payment.entity';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';

export class PrismaPaymentMockRepository implements IPaymentRepository {
    async create(payment: IPayment): Promise<IPayment> {
        return Promise.resolve(payment);
    }

    async findById(_id: string): Promise<IPayment | null> {
        return Promise.resolve(null);
    }

    async list(_query?: ListPaymentDto): Promise<IPayment[]> {
        return Promise.resolve([]);
    }

    async update(_id: string, payment: IPayment): Promise<IPayment> {
        return Promise.resolve(payment);
    }
}

const paymentMock = new Payment({
    id: '1',
    status: StatusPayment.PENDING,
    externalReference: 'ext-ref-123',
    qrCode: 'qr-code-data',
});

type MockOptions = {
    data?: IPayment;
    empty?: boolean;
};

type MockListOptions = {
    data?: IPayment[];
};

export function mockPaymentCreate({ data = paymentMock }: MockOptions = {}) {
    return vi.spyOn(PrismaPaymentMockRepository.prototype, 'create').mockResolvedValueOnce(data);
}

export function mockPaymentFindById({ data = paymentMock, empty }: MockOptions = {}) {
    return vi.spyOn(PrismaPaymentMockRepository.prototype, 'findById').mockResolvedValueOnce(empty ? null : data);
}

export function mockPaymentList({ data = [paymentMock] }: MockListOptions = {}) {
    return vi.spyOn(PrismaPaymentMockRepository.prototype, 'list').mockResolvedValueOnce(data);
}

export function mockPaymentUpdate({ data = paymentMock }: MockOptions = {}) {
    return vi.spyOn(PrismaPaymentMockRepository.prototype, 'update').mockResolvedValueOnce(data);
}
