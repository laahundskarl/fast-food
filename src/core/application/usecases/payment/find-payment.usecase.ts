import { Payment } from '#/core/domain/entities/payment.entity';
import { PaymentRepository } from '#/core/domain/repositories/payment.repository';

export class FindPaymentByIdUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(id: string): Promise<Payment> {
        return await this.paymentRepository.findById(id);
    }
}
