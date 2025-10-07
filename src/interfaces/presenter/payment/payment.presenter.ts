import { IPayment } from '#/domain/entities/payment.entity';
import { PaymentResponseDTO } from '#/interfaces/presenter/payment/payment-response.dto';

export class PaymentPresenter {
    static toDTO(payment: IPayment): PaymentResponseDTO {
        return {
            id: payment.id,
            status: payment.status,
            externalReference: payment.externalReference ?? null,
            qrCode: payment.qrCode ?? null,
            ...(payment.order && {
                order: {
                    id: payment.order.id,
                    value: payment.order.value,
                    orderNumber: payment.order.orderNumber,
                    status: payment.order.status,
                },
            }),
        };
    }
}
