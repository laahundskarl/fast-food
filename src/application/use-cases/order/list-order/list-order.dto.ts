import { OrderStatus, StatusPayment } from '@prisma/client';

export interface ListOrderRequestDto {
    status?: string;
    clientId?: string;
    productId?: string;
    paymentStatus?: string;
}

export interface ListOrderDto {
    status?: OrderStatus[];
    clientId?: string;
    productId?: string;
    paymentStatus?: StatusPayment[];
}
