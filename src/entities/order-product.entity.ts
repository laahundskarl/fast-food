import { Product } from '#/entities/product.entity';

type OrderProductPayload = {
    amount: number;
    value: number;
    productId?: string;
    id?: string;
    products?: Product;
};

export class OrderProduct {
    public readonly id?: string;
    public amount: number;
    public value: number;
    public productId?: string;
    public products?: Product;

    constructor({ amount, value, productId, id, products }: OrderProductPayload) {
        if (id) this.id = id;
        this.amount = amount;
        this.value = value;
        if (productId) this.productId = productId;
        if (products) this.products = products;
    }
}
