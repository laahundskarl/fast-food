import { inject, injectable } from 'inversify';

import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { ICreatePayment } from '#/domain/gateways/create-payment';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { PaymentBuilderService } from '#/domain/services/payment-builder.service';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class PaymentOrchestrationService {
    constructor(
        @inject(TYPES.CreatePaymentGateway) private readonly paymentGateway: ICreatePayment,
        @inject(TYPES.PaymentRepository) private readonly paymentRepository: IPaymentRepository,
    ) {}

    async createPaymentForOrder(order: Order): Promise<Payment> {
        const gatewayRequest = PaymentBuilderService.buildGatewayRequest(order);

        const gatewayResponse = await this.paymentGateway.execute(gatewayRequest);

        const payment = PaymentBuilderService.createPayment(
            order,
            gatewayResponse.externalReference,
            gatewayResponse.qrCode,
        );

        return await this.paymentRepository.create(payment);
    }
}
