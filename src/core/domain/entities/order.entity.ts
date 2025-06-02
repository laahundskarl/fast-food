import { Client, OrderStatus } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Payment } from '#/core/domain/entities/payment.entity';

export class Order {
    public readonly id?: string;
    public value: number;
    public orderNumber: number;
    public status: OrderStatus;
    public clientId?: string;
    public client?: Client;
    public orderProducts?: OrderProduct[];
    public payments?: Payment[];

    constructor(
        value: number,
        status?: OrderStatus,
        orderNumber?: number,
        clientId?: string,
        id?: string,
        client?: Client,
        orderProducts?: OrderProduct[],
        payments?: Payment[],
    ) {
        if (id) this.id = id;
        if (clientId) this.clientId = clientId;
        this.value = value;
        this.orderNumber = orderNumber;
        this.status = status;
        if (client) this.client = client;
        if (orderProducts) this.orderProducts = orderProducts;
        if (payments) this.payments = payments;
    }
}
