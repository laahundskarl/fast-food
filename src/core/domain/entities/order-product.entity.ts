import { Product } from '#/core/domain/entities/product.entity';

export class OrderProduct {
    constructor(
        public amount: number,
        public value: number,
        public readonly id?: string,
        public products?: Product,
    ) {}
}
