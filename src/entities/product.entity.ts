import { ProductCategory } from '#/entities/product-category.entity';

type ProductPayload = {
    name: string;
    value: number;
    description: string | null;
    categoryId?: string;
    id?: string;
    category?: ProductCategory;
};

export class Product {
    public id?: string;
    public name: string;
    public value: number;
    public description: string | null;
    public categoryId?: string;
    public category?: ProductCategory;

    constructor({ name, value, description, categoryId, id, category }: ProductPayload) {
        if (id) this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
        if (categoryId) this.categoryId = categoryId;
        if (category) this.category = category;
    }
}
