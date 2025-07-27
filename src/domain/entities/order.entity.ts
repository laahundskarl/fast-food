import { randomUUID } from 'crypto';

import { OrderStatus } from '@prisma/client';

import { Client } from '#/domain/entities/client.entity';
import { OrderProduct } from '#/domain/entities/order-product.entity';
import { Payment } from '#/domain/entities/payment.entity';

type OrderPayload = {
    id?: string;
    value: number;
    orderNumber: number;
    status: OrderStatus;
    orderProducts: OrderProduct[];
    payments: Payment[];
    client?: Client;
};

export class Order {
    public readonly id: string;
    public value: number;
    public orderNumber: number;
    public status: OrderStatus;
    public orderProducts: OrderProduct[];
    public payments: Payment[];
    public client?: Client | null;

    constructor(payload: OrderPayload) {
        this.id = payload.id || randomUUID();
        this.value = payload.value;
        this.orderNumber = payload.orderNumber;
        this.status = payload.status;
        this.orderProducts = payload.orderProducts;
        this.payments = payload.payments;
        this.client = payload.client || null;
    }
}
