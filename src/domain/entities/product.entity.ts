import { randomUUID } from 'crypto';

import { ProductCategory } from '#/domain/entities/product-category.entity';

export type ProductPayload = {
    id?: string;
    name: string;
    value: number;
    description: string | null;
    category?: ProductCategory;
};

export class Product {
    public readonly id: string;
    public name: string;
    public value: number;
    public description: string | null;
    public category: ProductCategory;

    constructor(payload: ProductPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        this.value = payload.value;
        this.description = payload.description || null;
        this.category = payload.category!;
    }
}
