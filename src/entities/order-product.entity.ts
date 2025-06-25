import { Product } from '#/entities/product.entity';

type OrderProductPayload = {
    amount: number;
    value: number;
    productId: string;
    id: string;
    product?: Product;
};

export class OrderProduct {
    public readonly id: string;
    public amount: number;
    public value: number;
    public total: number;
    public productId: string;
    public product?: Product;

    constructor({ amount, value, productId, id, product }: OrderProductPayload) {
        this.id = id;
        this.amount = amount;
        this.value = value;
        this.productId = productId;
        if (product) this.product = product;
        this.total = value * amount;
    }
}

export class CreateOrderProduct {
    productId: string;
    amount: number;
    value: number;

    constructor({ productId, amount, value }: { productId: string; amount: number; value: number }) {
        this.productId = productId;
        this.amount = amount;
        this.value = value;
    }
}
