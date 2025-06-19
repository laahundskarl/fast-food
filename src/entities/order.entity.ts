import { Client, OrderStatus } from '@prisma/client';

import { OrderProduct } from '#/entities/order-product.entity';
import { Payment } from '#/entities/payment.entity';

type OrderPayload = {
    value: number;
    status?: OrderStatus;
    orderNumber?: number;
    clientId?: string;
    id?: string;
    client?: Client;
    orderProducts?: OrderProduct[];
    payments?: Payment[];
};

export class Order {
    public readonly id?: string;
    public value: number;
    public orderNumber: number;
    public status: OrderStatus;
    public clientId?: string;
    public client?: Client;
    public orderProducts?: OrderProduct[];
    public payments?: Payment[];

    constructor({ value, status, orderNumber, clientId, id, client, orderProducts, payments }: OrderPayload) {
        if (id) this.id = id;
        if (clientId) this.clientId = clientId;
        this.value = value;
        this.orderNumber = orderNumber ?? 0;
        this.status = status ?? OrderStatus.WAITING;
        if (client) this.client = client;
        if (orderProducts) this.orderProducts = orderProducts;
        if (payments) this.payments = payments;
    }
}
