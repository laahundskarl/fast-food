import { StatusPayment } from '@prisma/client';

export interface ListPaymentDto {
    orderId?: string;
    status?: StatusPayment;
}
