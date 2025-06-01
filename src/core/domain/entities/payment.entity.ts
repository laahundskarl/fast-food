import { StatusPayment } from '@prisma/client';

import { Order } from '#/core/domain/entities/order.entity';

export class Payment {
    public readonly id: string;
    public status: StatusPayment;
    public externalReference: string | null;
    public qrCode: string | null;
    public order?: Order;

    constructor(
        id: string,
        status: StatusPayment,
        externalReference: string | null,
        qrCode: string | null,
        order?: Order,
    ) {
        this.id = id;
        this.status = status;
        this.externalReference = externalReference;
        this.qrCode = qrCode;
        if (order) this.order = order;
    }
}
