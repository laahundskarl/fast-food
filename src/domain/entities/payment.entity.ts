import { randomUUID } from 'crypto';

import { StatusPayment } from '@prisma/client';

import { IOrder } from '#/domain/entities/order.entity';

export interface IPayment {
    readonly id: string;
    status: StatusPayment;
    order?: IOrder;
    externalReference?: string | null;
    qrCode?: string | null;
}

type PaymentPayload = {
    id?: string;
    status: StatusPayment;
    order?: IOrder;
    externalReference?: string;
    qrCode?: string;
};

export class Payment implements IPayment {
    public readonly id: string;
    public status: StatusPayment;
    public order?: IOrder;
    public externalReference?: string | null;
    public qrCode?: string | null;

    constructor(payload: PaymentPayload) {
        this.id = payload.id || randomUUID();
        this.status = payload.status;
        if (payload.order) {
            this.order = payload.order;
        }
        this.externalReference = payload.externalReference || null;
        this.qrCode = payload.qrCode || null;
    }
}
