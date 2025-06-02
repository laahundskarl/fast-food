import { StatusPayment } from '@prisma/client';

import { Order } from '#/core/domain/entities/order.entity';

export class Payment {
    constructor(
        public status: StatusPayment,
        public externalReference?: string | null,
        public qrCode?: string | null,
        public readonly id?: string,
        public order?: Order,
    ) {}
}
