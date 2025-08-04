import { StatusPayment } from '@prisma/client';

import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { CreateQrCodeInput } from '#/domain/gateways/dto/create-qr-code-input';

export class PaymentBuilderService {
    static createPayment(order: Order, externalReference?: string, qrCode?: string): Payment {
        return new Payment({
            status: StatusPayment.PENDING,
            order: order,
            externalReference: externalReference,
            qrCode: qrCode,
        });
    }

    static buildGatewayRequest(order: Order): CreateQrCodeInput {
        return {
            orderId: order.id,
            items: order.orderProducts!,
            amount: order.value,
        };
    }
}
