import { Product } from '#/core/domain/entities/product.entity';

export class ProductCategory {
    public readonly id?: string;
    public name: string;
    public products?: Product[] = [];

    constructor(id: string, name: string, products?: Product[]) {
        this.id = id;
        this.name = name;
        if (products) this.products = products;
    }
}
