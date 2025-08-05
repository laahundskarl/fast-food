import { OrderStatus, StatusPayment } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { WebhookHandlerDto } from '#/application/use-cases/webhook/webhook-handler.dto';
import { IWebhookHandlerUseCase } from '#/application/use-cases/webhook/webhook-handler.use-case';
import { NotFoundError } from '#/domain/errors';
import { IGetPayment } from '#/domain/gateways/get-payment';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { TYPES } from '#/infrastructure/config/types';

const statusPayment: Record<string, StatusPayment> = {
    pending: StatusPayment.PENDING,
    approved: StatusPayment.APPROVED,
    rejected: StatusPayment.REJECTED,
};

const orderStatus: Record<string, OrderStatus> = {
    pending: OrderStatus.WAITING,
    approved: OrderStatus.DONE,
    rejected: OrderStatus.CANCELED,
};

@injectable()
export class WebhookHandler implements IWebhookHandlerUseCase {
    constructor(
        @inject(TYPES.GetPaymentGateway) private readonly getPaymentGateway: IGetPayment,
        @inject(TYPES.PaymentRepository) private readonly paymentRepository: IPaymentRepository,
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
    ) {}

    async execute(request: WebhookHandlerDto): Promise<void> {
        const gateway = await this.getPaymentGateway.execute(request.data.id);
        console.log('Webhook received:', gateway);

        const payment = await this.paymentRepository.findById(gateway.externalReference);
        if (!payment) {
            throw new NotFoundError(`Payment not found for externalReference: ${gateway.externalReference}`);
        }

        payment.status = statusPayment[gateway.status];
        payment.externalReference = String(gateway.id);
        await this.paymentRepository.update(payment.id, payment);

        const order = await this.orderRepository.findById(payment.order!.id);
        if (!order) {
            throw new NotFoundError(`Order not found for id: ${payment.order!.id}`);
        }
        order.status = orderStatus[gateway.status];
        await this.orderRepository.updateStatus(order.id, order);
    }
}
