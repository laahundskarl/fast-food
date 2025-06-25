import { PaymentListDto, PaymentUpdateDto } from '#/dto/payment.dto';
import { CreatePayment, Payment } from '#/entities/payment.entity';

export interface IPaymentRepository {
    update(id: string, payment: PaymentUpdateDto): Promise<Payment>;
    findById(id: string): Promise<Payment>;
    list(query?: PaymentListDto): Promise<Payment[]>;
    create(payment: CreatePayment): Promise<Payment>;
    cancelPayment(id: string): Promise<void>;
}
