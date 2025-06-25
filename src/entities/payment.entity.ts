import { StatusPayment } from '@prisma/client';

import { Order } from '#/entities/order.entity';

type OrderWithoutRelations = Omit<Order, 'client' | 'orderProducts' | 'payments'>;

type PaymentPayload = {
    externalReference: string | null;
    qrCode: string | null;
    status?: StatusPayment;
    id: string;
    order?: OrderWithoutRelations;
};

export class Payment {
    public id: string;
    public status?: StatusPayment;
    public externalReference?: string | null;
    public qrCode?: string | null;
    public order?: OrderWithoutRelations;

    constructor({ externalReference, qrCode, status, id, order }: PaymentPayload) {
        this.id = id;
        if (status) this.status = status;
        this.externalReference = externalReference;
        this.qrCode = qrCode;
        this.order = order;
    }
}

export class CreatePayment {
    externalReference: string | null;
    qrCode: string | null;
    orderId: string;

    constructor({
        externalReference,
        qrCode,
        orderId,
    }: {
        externalReference: string | null;
        qrCode: string | null;
        orderId: string;
    }) {
        this.externalReference = externalReference;
        this.qrCode = qrCode;
        this.orderId = orderId;
    }
}
