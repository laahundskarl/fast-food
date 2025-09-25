import { randomUUID } from 'crypto';

import { IProduct } from '#/domain/entities/product.entity';

export interface IProductCategory {
    readonly id: string;
    name: string;
    products?: IProduct[];
}

type ProductCategoryPayload = {
    id?: string;
    name: string;
    products?: IProduct[];
};

export class ProductCategory implements IProductCategory {
    public readonly id: string;
    public name: string;
    public products?: IProduct[];

    constructor(payload: ProductCategoryPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        if (payload.products) {
            this.products = payload.products;
        }
    }
}
