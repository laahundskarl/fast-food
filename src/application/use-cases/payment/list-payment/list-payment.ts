import { inject, injectable } from 'inversify';

import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IListPaymentUseCase } from '#/application/use-cases/payment/list-payment/list-payment.use-case';
import { Payment } from '#/domain/entities/payment.entity';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class ListPayment implements IListPaymentUseCase {
    constructor(@inject(TYPES.PaymentRepository) private readonly paymentRepository: IPaymentRepository) {}

    async execute(query?: ListPaymentDto): Promise<Payment[]> {
        return await this.paymentRepository.list(query);
    }
}
