import { Product } from '#/core/domain/entities/product.entity';

export class ProductCategory {
    constructor(
        public name: string,
        public readonly id?: string,
        public products?: Product[],
    ) {}
}
