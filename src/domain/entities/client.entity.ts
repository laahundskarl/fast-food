import { randomUUID } from 'crypto';

import { Order } from '#/domain/entities/order.entity';

type ClientPayload = {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    orders?: Order[];
};

export class Client {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;
    public orders?: Order[];

    constructor(payload: ClientPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        this.cpf = payload.cpf;
        this.email = payload.email;
        if (payload.orders) {
            this.orders = payload.orders;
        }
    }
}
