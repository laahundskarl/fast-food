import { Product } from '#/core/domain/entities/product.entity';

export class OrderProduct {
    public readonly id: string;
    public amount: number;
    public value: number;
    public products?: Product;

    constructor(id: string, amount: number, value: number, products?: Product) {
        this.id = id;
        this.amount = amount;
        this.value = value;
        if (products) this.products = products;
    }
}
