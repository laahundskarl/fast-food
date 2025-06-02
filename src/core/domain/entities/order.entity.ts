import { Client, OrderStatus } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Payment } from '#/core/domain/entities/payment.entity';

export class Order {
    constructor(
        public value: number,
        public orderNumber: number,
        public status: OrderStatus,
        public readonly id?: string,
        public client?: Client,
        public orderProducts?: OrderProduct[],
        public payments?: Payment[],
    ) {}
}
