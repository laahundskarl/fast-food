import { Product } from '#/entities/product.entity';

type ProductCategoryPayload = {
    name: string;
    id: string;
    products?: Product[];
};

export class ProductCategory {
    public readonly id: string;
    public name: string;
    public products: Product[] = [];

    constructor({ name, id, products }: ProductCategoryPayload) {
        this.id = id;
        this.name = name;
        this.products = products || [];
    }
}

export class CreateProductCategory {
    name: string;

    constructor({ name }: { name: string }) {
        this.name = name;
    }
}
