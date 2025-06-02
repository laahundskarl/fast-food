import { Payment } from '#/core/domain/entities/payment.entity';
import { PaymentListDto, PaymentUpdateDto } from '#/infrastructure/adapters/dto/payment.dto';

export interface PaymentRepository {
    update(id: string, payment: PaymentUpdateDto): Promise<Payment>;
    findById(id: string): Promise<Payment>;
    list(query?: PaymentListDto): Promise<Payment[]>;
}
