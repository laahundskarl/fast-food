import { Payment } from '#/core/domain/entities/payment.entity';
import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { PaymentListDto } from '#/infrastructure/adapters/dto/payment.dto';

export class ListPaymentUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(query?: PaymentListDto): Promise<Payment[]> {
        return await this.paymentRepository.list(query);
    }
}
