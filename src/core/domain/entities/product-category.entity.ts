import { Product } from '#/core/domain/entities/product.entity';

export class ProductCategory {
    public readonly id?: string;
    public name: string;
    public products?: Product[];

    constructor(name: string, id?: string, products?: Product[]) {
        if (id) this.id = id;
        this.name = name;
        if (products) this.products = products;
    }
}
