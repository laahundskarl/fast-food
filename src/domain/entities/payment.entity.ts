import { randomUUID } from 'crypto';

import { StatusPayment } from '@prisma/client';

import { Order } from '#/domain/entities/order.entity';

type PaymentPayload = {
    id?: string;
    status: StatusPayment;
    order: Order;
    externalReference?: string;
    qrCode?: string;
};

export class Payment {
    public readonly id: string;
    public status: StatusPayment;
    public order: Order;
    public externalReference?: string | null;
    public qrCode?: string | null;

    constructor(payload: PaymentPayload) {
        this.id = payload.id || randomUUID();
        this.status = payload.status;
        this.order = payload.order;
        this.externalReference = payload.externalReference || null;
        this.qrCode = payload.qrCode || null;
    }
}
