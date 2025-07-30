import { UpdatePaymentDto } from '#/application/use-cases/payment/update-payment/update-payment.dto';
import { Payment } from '#/domain/entities/payment.entity';

export interface IUpdatePaymentUseCase {
    execute(id: string, payment: UpdatePaymentDto): Promise<Payment>;
}
