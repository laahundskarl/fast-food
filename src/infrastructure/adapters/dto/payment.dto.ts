import { StatusPayment } from '@prisma/client';

export interface PaymentCreateDTO {
    orderId: string;
    value: number;
    status: StatusPayment;
}

export interface PaymentListDto {
    orderId?: string;
    status?: StatusPayment;
}

export interface PaymentUpdateDto {
    status?: StatusPayment;
    externalReference?: string;
    qrCode?: string;
}
