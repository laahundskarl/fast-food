import { Client, OrderStatus } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Payment } from '#/core/domain/entities/payment.entity';

export class Order {
    public readonly id: string;
    public value: number;
    public orderNumber: number;
    public status: OrderStatus;
    public client?: Client;
    public orderProducts?: OrderProduct[];
    public payments?: Payment[];

    constructor(
        id: string,
        value: number,
        orderNumber: number,
        status: OrderStatus,
        client?: Client,
        payments?: Payment[],
        orderProducts?: OrderProduct[],
    ) {
        this.id = id;
        this.value = value;
        this.orderNumber = orderNumber;
        this.status = status;
        if (client) this.client = client;
        if (payments) this.payments = payments;
        if (orderProducts) this.orderProducts = orderProducts;
    }
}
