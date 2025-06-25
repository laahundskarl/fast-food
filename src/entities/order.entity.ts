import { Client, OrderStatus } from '@prisma/client';

import { CreateOrderProduct, OrderProduct } from '#/entities/order-product.entity';
import { Payment } from '#/entities/payment.entity';

type OrderPayload = {
    value: number;
    status?: OrderStatus;
    orderNumber?: number;
    clientId?: string | null;
    id: string;
    client?: Client;
    orderProducts?: OrderProduct[];
    payments: Payment[];
};

export class Order {
    public readonly id: string;
    public value: number;
    public orderNumber: number;
    public status: OrderStatus;
    public clientId: string | null = null;
    public client?: Client;
    public orderProducts: OrderProduct[] = [];
    public payments: Payment[] = [];

    constructor({ value, status, orderNumber, clientId, id, client, orderProducts, payments }: OrderPayload) {
        this.id = id;
        if (clientId) this.clientId = clientId;
        this.value = value;
        this.orderNumber = orderNumber ?? 0;
        this.status = status ?? OrderStatus.WAITING;
        if (client) this.client = client;
        if (orderProducts) this.orderProducts = orderProducts;
        if (payments) this.payments = payments;
    }
}

export class CreateOrder {
    clientId: string | null;
    orderProducts: CreateOrderProduct[];
    total: number;

    constructor({
        clientId,
        orderProducts,
        total,
    }: {
        clientId: string | null;
        orderProducts: CreateOrderProduct[];
        total: number;
    }) {
        this.clientId = clientId;
        this.orderProducts = orderProducts;
        this.total = total;
    }
}

export class UpdateOrder {
    id: string;
    status: OrderStatus;
    clientId: string | null;
    orderProducts: CreateOrderProduct[];
    orderNumber: number;
    value: number;

    constructor({
        id,
        status,
        clientId,
        orderProducts,
        orderNumber,
        value,
    }: {
        id: string;
        status: OrderStatus;
        clientId: string | null;
        orderProducts: CreateOrderProduct[];
        orderNumber: number;
        value: number;
    }) {
        this.id = id;
        this.status = status;
        this.clientId = clientId;
        this.orderProducts = orderProducts;
        this.orderNumber = orderNumber;
        this.value = value;
    }
}
