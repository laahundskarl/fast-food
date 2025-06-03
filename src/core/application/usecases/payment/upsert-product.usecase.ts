import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { PaymentUpsertDTO } from '#/infrastructure/adapters/dto/payment.dto';

export class UpsertPaymentUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(id: string, payment: PaymentUpsertDTO): Promise<any> {
        return await this.paymentRepository.upsert(id, payment);
    }
}
