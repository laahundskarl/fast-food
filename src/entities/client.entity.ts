import { Order } from '#/entities/order.entity';

type ClientPayload = {
    name: string;
    cpf: string;
    email: string;
    id?: string;
    orders?: Order[];
};

export class Client {
    public readonly id?: string;
    public name: string;
    public cpf: string;
    public email: string;
    public orders?: Order[];

    constructor({ name, cpf, email, id, orders }: ClientPayload) {
        if (id) this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        if (orders) this.orders = orders;
    }
}
