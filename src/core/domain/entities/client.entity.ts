import { Order } from '#/core/domain/entities/order.entity';

export class Client {
    public readonly id?: string;
    public name: string;
    public cpf: string;
    public email: string;
    public orders?: Order[];

    constructor(name: string, cpf: string, email: string, id?: string, orders?: Order[]) {
        if (id) this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        if (orders) this.orders = orders;
    }
}
