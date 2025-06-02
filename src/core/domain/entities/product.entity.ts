import { ProductCategory } from '#/core/domain/entities/product-category.entity';

export class Product {
    constructor(
        public name: string,
        public value: number,
        public description: string | null,
        public readonly id?: string,
        public category?: ProductCategory,
    ) {}
}
