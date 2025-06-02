import { StatusPayment } from '@prisma/client';

import { Order } from '#/core/domain/entities/order.entity';

export class Payment {
    public readonly id?: string;
    public status?: StatusPayment;
    public externalReference?: string | null;
    public qrCode?: string | null;
    public order?: Order;

    constructor(
        externalReference: string | null,
        qrCode: string | null,
        status?: StatusPayment,
        id?: string,
        order?: Order,
    ) {
        if (id) this.id = id;
        if (status) this.status = status;
        this.externalReference = externalReference;
        this.qrCode = qrCode;
        if (order) this.order = order;
    }
}
