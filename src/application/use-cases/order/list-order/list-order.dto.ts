import { OrderStatus, StatusPayment } from '@prisma/client';

export interface ListOrderRequestDto {
    status?: string;
    clientId?: string;
    page?: string;
    limit?: string;
    productId?: string;
    paymentStatus?: string;
}

export interface ListOrderDto {
    status?: OrderStatus[];
    clientId?: string;
    productId?: string;
    paymentStatus?: StatusPayment[];
    page?: number;
    limit?: number;
}
