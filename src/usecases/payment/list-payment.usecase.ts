import { PaymentListDto } from '#/dto/payment.dto';
import { Payment } from '#/entities/payment.entity';
import { PaymentRepository } from '#/repositories/payment.repository';

export class ListPaymentUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(query?: PaymentListDto): Promise<Payment[]> {
        return await this.paymentRepository.list(query);
    }
}
