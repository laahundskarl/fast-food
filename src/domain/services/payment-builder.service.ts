import { StatusPayment } from '@prisma/client';

import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { CreateQrCodeInput } from '#/domain/gateways/dto/create-qr-code-input';

export class PaymentBuilderService {
    static createPayment(order: Order): Payment {
        return new Payment({
            status: StatusPayment.PENDING,
            order: order,
        });
    }

    static buildGatewayRequest(paymentId: string, order: Order): CreateQrCodeInput {
        return {
            paymentId,
            items: order.orderProducts!,
            amount: order.value,
        };
    }
}
