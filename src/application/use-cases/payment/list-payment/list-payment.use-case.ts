import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { Payment } from '#/domain/entities/payment.entity';

export interface IListPaymentUseCase {
    execute(query?: ListPaymentDto): Promise<Payment[]>;
}
