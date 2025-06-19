import { StatusPayment } from '@prisma/client';

import { Order } from '#/entities/order.entity';

type PaymentPayload = {
    externalReference: string | null;
    qrCode: string | null;
    status?: StatusPayment;
    id?: string;
    order?: Order;
};

export class Payment {
    public readonly id?: string;
    public status?: StatusPayment;
    public externalReference?: string | null;
    public qrCode?: string | null;
    public order?: Order;

    constructor({ externalReference, qrCode, status, id, order }: PaymentPayload) {
        if (id) this.id = id;
        if (status) this.status = status;
        this.externalReference = externalReference;
        this.qrCode = qrCode;
        if (order) this.order = order;
    }
}
