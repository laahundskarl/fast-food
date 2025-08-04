import { StatusPayment } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IWebhookHandlerUseCase } from '#/application/use-cases/gateway/webhook-handler';
import { IUpdatePaymentUseCase } from '#/application/use-cases/payment/update-payment/update-payment.use-case';
import { IGetPayment } from '#/domain/gateways/get-payment';
import { IWebhookMessage } from '#/domain/gateways/webhook-message';
import { TYPES } from '#/infrastructure/config/types';

const statusPayment: Record<string, StatusPayment> = {
    pending: StatusPayment.PENDING,
    approved: StatusPayment.APPROVED,
    rejected: StatusPayment.REJECTED,
};

@injectable()
export class MercadoPagoWebhookHandlerUseCase implements IWebhookHandlerUseCase {
    constructor(
        @inject(TYPES.GetPaymentGateway)
        private readonly getPaymentGateway: IGetPayment,
        @inject(TYPES.UpdatePaymentUseCase)
        private readonly updatePaymentUseCase: IUpdatePaymentUseCase,
    ) {}

    async execute(request: IWebhookMessage): Promise<void> {
        const payment = await this.getPaymentGateway.execute(request.data.id);
        await this.updatePaymentUseCase.execute(payment.externalReference, {
            status: statusPayment[payment.status],
            externalReference: payment.id.toString(),
        });
    }
}
