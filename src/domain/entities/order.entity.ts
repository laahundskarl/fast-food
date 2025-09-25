import { randomUUID } from 'crypto';

import { OrderStatus } from '@prisma/client';

import { IClient } from '#/domain/entities/client.entity';
import { IOrderProduct } from '#/domain/entities/order-product.entity';
import { IPayment } from '#/domain/entities/payment.entity';
import { BusinessError } from '#/domain/errors';

export interface IOrder {
    readonly id: string;
    value: number;
    orderNumber: number;
    status: OrderStatus;
    orderProducts: IOrderProduct[];
    payments: IPayment[];
    client?: IClient;
    updateStatus(newStatus: OrderStatus): void;
}

type OrderPayload = {
    id?: string;
    value: number;
    orderNumber: number;
    status: OrderStatus;
    orderProducts?: IOrderProduct[];
    payments?: IPayment[];
    client?: IClient;
};

export class Order implements IOrder {
    public readonly id: string;
    public value: number;
    public orderNumber: number;
    public status: OrderStatus;
    public orderProducts: IOrderProduct[];
    public payments: IPayment[];
    public client?: IClient;

    constructor(payload: OrderPayload) {
        this.id = payload.id || randomUUID();
        this.value = payload.value;
        this.orderNumber = payload.orderNumber;
        this.status = payload.status;
        this.orderProducts = payload.orderProducts || [];
        this.payments = payload.payments || [];
        this.client = payload.client || undefined;
    }

    updateStatus(newStatus: OrderStatus) {
        const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
            [OrderStatus.WAITING]: [OrderStatus.RECEIVED, OrderStatus.CANCELED],
            [OrderStatus.RECEIVED]: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELED],
            [OrderStatus.IN_PROGRESS]: [OrderStatus.DONE],
            [OrderStatus.DONE]: [OrderStatus.FINISHED],
            [OrderStatus.FINISHED]: [],
            [OrderStatus.CANCELED]: [],
        };

        const next = allowedTransitions[this.status] ?? [];

        if (!next.includes(newStatus)) {
            throw new BusinessError(400, `Cannot change status from ${this.status} to ${newStatus}`);
        }

        this.status = newStatus;
    }
}
