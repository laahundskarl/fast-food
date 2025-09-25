import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IPayment } from '#/domain/entities/payment.entity';

export interface IPaymentRepository {
    create(payment: IPayment): Promise<IPayment>;
    findById(id: string): Promise<IPayment | null>;
    update(id: string, payment: IPayment): Promise<IPayment>;
    list(query?: ListPaymentDto): Promise<IPayment[]>;
}
