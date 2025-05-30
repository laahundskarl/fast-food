import { StatusPayment } from '#/core/domain/entities/payment.entity';

export interface PaymentCreateDTO {
    orderId: string;
    value: number;
    status: StatusPayment;
}
