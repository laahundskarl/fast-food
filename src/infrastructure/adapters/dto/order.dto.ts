import { OrderStatus, StatusPayment } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';

export interface OrderListDto {
    status?: OrderStatus[];
    clientId?: string;
    productId?: string;
    paymentStatus?: StatusPayment[];
}

export interface OrderCreateDto {
    clientId: string;
    orderProducts: OrderProduct[];
    value?: number;
}

export interface OrderUpdateDto {
    status?: string;
    value?: number;
    orderProducts?: OrderProduct[];
}
