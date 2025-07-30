import { StatusPayment } from '@prisma/client';

export interface UpdatePaymentDto {
    status?: StatusPayment;
    externalReference?: string;
    qrCode?: string;
}
