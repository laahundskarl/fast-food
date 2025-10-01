import { inject, injectable } from 'inversify';

import { IGetPaymentUseCase } from '#/application/use-cases/payment/get-payment/get-payment.use-case';
import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IListPaymentUseCase } from '#/application/use-cases/payment/list-payment/list-payment.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IPaymentController } from '#/interfaces/controller/types/payment';
import { PaymentResponseDTO } from '#/interfaces/presenter/payment/payment-response.dto';
import { PaymentPresenter } from '#/interfaces/presenter/payment/payment.presenter';

@injectable()
export class PaymentController implements IPaymentController {
    constructor(
        @inject(TYPES.GetPaymentUseCase) private readonly getPaymentUseCase: IGetPaymentUseCase,
        @inject(TYPES.ListPaymentUseCase) private readonly listPaymentUseCase: IListPaymentUseCase,
    ) {}

    async get(id: string): Promise<PaymentResponseDTO> {
        const result = await this.getPaymentUseCase.execute(id);
        return PaymentPresenter.toDTO(result);
    }

    async list(query: ListPaymentDto): Promise<PaymentResponseDTO[]> {
        const result = await this.listPaymentUseCase.execute(query);
        return result.map(item => PaymentPresenter.toDTO(item));
    }
}
