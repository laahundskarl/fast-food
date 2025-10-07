import { randomUUID } from 'crypto';

import { IProductCategory } from '#/domain/entities/product-category.entity';

export interface IProduct {
    readonly id: string;
    name: string;
    value: number;
    description: string | null;
    category: IProductCategory;
}

export type ProductPayload = {
    id?: string;
    name: string;
    value: number;
    description: string | null;
    category?: IProductCategory;
};

export class Product implements IProduct {
    public readonly id: string;
    public name: string;
    public value: number;
    public description: string | null;
    public category: IProductCategory;

    constructor(payload: ProductPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        this.value = payload.value;
        this.description = payload.description || null;
        this.category = payload.category!;
    }
}
