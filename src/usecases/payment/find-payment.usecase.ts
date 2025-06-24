import { Payment } from '#/entities/payment.entity';
import { IPaymentRepository } from '#/repositories/payment.repository';

export class FindPaymentByIdUseCase {
    constructor(private readonly paymentRepository: IPaymentRepository) {}

    async execute(id: string): Promise<Payment> {
        return await this.paymentRepository.findById(id);
    }
}
