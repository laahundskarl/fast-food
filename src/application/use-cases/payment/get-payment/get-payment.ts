import { inject, injectable } from 'inversify';

import { IGetPaymentUseCase } from '#/application/use-cases/payment/get-payment/get-payment.use-case';
import { Payment } from '#/domain/entities/payment.entity';
import { NotFoundError } from '#/domain/errors';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetPayment implements IGetPaymentUseCase {
    constructor(@inject(TYPES.PaymentRepository) private readonly paymentRepository: IPaymentRepository) {}

    async execute(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new NotFoundError('Payment not found');
        }
        return payment;
    }
}
