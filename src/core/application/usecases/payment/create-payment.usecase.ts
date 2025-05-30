import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { PaymentCreateDTO } from '#/infrastructure/adapters/dto/payment.dto';

export class CreatePaymentUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(payment: PaymentCreateDTO): Promise<any> {
        return await this.paymentRepository.create(payment);
    }
}
