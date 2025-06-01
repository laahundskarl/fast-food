import { ProductCategory } from '#/core/domain/entities/product-category.entity';

export class Product {
    public readonly id: string;
    public name: string;
    public value: number;
    public description: string | null;
    public category?: ProductCategory;

    constructor(id: string, name: string, value: number, description: string | null, category?: ProductCategory) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
        if (category) this.category = category;
    }
}
