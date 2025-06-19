import { Product } from '#/entities/product.entity';

type ProductCategoryPayload = {
    name: string;
    id?: string;
    products?: Product[];
};

export class ProductCategory {
    public readonly id?: string;
    public name: string;
    public products?: Product[];

    constructor({ name, id, products }: ProductCategoryPayload) {
        if (id) this.id = id;
        this.name = name;
        if (products) this.products = products;
    }
}
