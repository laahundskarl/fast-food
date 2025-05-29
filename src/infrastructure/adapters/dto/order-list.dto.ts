import { OrderProduct } from '#/core/domain/entities/order-product.entity';

export interface OrderListDTO {
    status?: string;
    clientId?: string;
    productId?: string;
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
