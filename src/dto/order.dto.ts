import { OrderStatus, StatusPayment } from '@prisma/client';

export interface OrderListRequestDto {
    status?: string;
    clientId?: string;
    productId?: string;
    paymentStatus?: string;
}

export interface OrderListDto {
    status?: OrderStatus[];
    clientId?: string;
    productId?: string;
    paymentStatus?: StatusPayment[];
}

export interface OrderCreateDto {
    clientId: string | null;
    orderProducts: [
        {
            productId: string;
            quantity: number;
        },
    ];
}

export interface OrderUpdateDto {
    status?: string;
    orderProducts?: [
        {
            productId: string;
            quantity: number;
        },
    ];
}
