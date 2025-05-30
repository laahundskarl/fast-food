import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { OrderStatus } from '#/core/domain/entities/order.entity';
import { StatusPayment } from '#/core/domain/entities/payment.entity';

export interface OrderListRequestDTO {
    status?: string;
    clientId?: string;
    productId?: string;
    paymentStatus?: string;
}

export interface OrderListDTO {
    status?: OrderStatus[];
    clientId?: string;
    productId?: string;
    paymentStatus?: StatusPayment[];
}

export interface OrderCreateDTO {
    clientId: string;
    value: number;
    orderNumber: number;
    orderProducts: OrderProduct[];
}

export interface OrderUpdateDTO {
    id: string;
    clientId?: string;
    status?: string;
    value?: number;
    orderNumber?: number;
    orderProducts?: OrderProduct[];
}
