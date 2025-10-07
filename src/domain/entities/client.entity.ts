import { randomUUID } from 'crypto';

import { IOrder } from '#/domain/entities/order.entity';

export interface IClient {
    id: string;
    name: string;
    cpf: string;
    email: string;
    orders?: IOrder[];
}

export type ClientPayload = {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    orders?: IOrder[];
};

export class Client implements IClient {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;
    public orders?: IOrder[];

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
