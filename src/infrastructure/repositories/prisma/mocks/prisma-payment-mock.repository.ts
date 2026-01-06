import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IPayment } from '#/domain/entities/payment.entity';
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
