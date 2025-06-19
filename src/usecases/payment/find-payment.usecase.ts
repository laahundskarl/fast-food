import { Payment } from '#/entities/payment.entity';
import { PaymentRepository } from '#/repositories/payment.repository';

export class FindPaymentByIdUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(id: string): Promise<Payment> {
        return await this.paymentRepository.findById(id);
    }
}
