import { randomUUID } from 'crypto';

import { IProduct } from '#/domain/entities/product.entity';

export interface IOrderProduct {
    readonly id: string;
    amount: number;
    value: number;
    product: IProduct;
}

type OrderProductPayload = {
    id?: string;
    amount: number;
    value: number;
    product: IProduct;
};

export class OrderProduct implements IOrderProduct {
    public readonly id: string;
    public amount: number;
    public value: number;
    public product: IProduct;

    constructor(payload: OrderProductPayload) {
        this.id = payload.id || randomUUID();
        this.amount = payload.amount;
        this.value = payload.value;
        this.product = payload.product;
    }
}
