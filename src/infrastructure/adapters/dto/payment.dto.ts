import { StatusPayment } from '@prisma/client';

export interface PaymentCreateDTO {
    orderId: string;
    value: number;
    status: StatusPayment;
}
