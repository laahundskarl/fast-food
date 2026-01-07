import { randomUUID } from 'crypto';

import { Product } from '#/domain/entities/product.entity';

export type ProductCategoryPayload = {
    id?: string;
    name: string;
    products?: Product[];
};

export class ProductCategory {
    public readonly id: string;
    public name: string;
    public products?: Product[];

    constructor(payload: ProductCategoryPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        if (payload.products) {
            this.products = payload.products;
        }
    }
}
