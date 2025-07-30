import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { Payment } from '#/domain/entities/payment.entity';

export interface IPaymentRepository {
    findById(id: string): Promise<Payment | null>;
    update(id: string, payment: Payment): Promise<Payment>;
    list(query?: ListPaymentDto): Promise<Payment[]>;
}
