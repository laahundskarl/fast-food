import { randomUUID } from 'crypto';

import { ProductCategory } from '#/domain/entities/product-category.entity';

type ProductPayload = {
    id?: string;
    name: string;
    value: number;
    description: string;
    category: ProductCategory;
};

export class Product {
    public readonly id: string;
    public name: string;
    public value: number;
    public description: string;
    public category: ProductCategory;

    constructor(payload: ProductPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        this.value = payload.value;
        this.description = payload.description;
        this.category = payload.category;
    }
}
