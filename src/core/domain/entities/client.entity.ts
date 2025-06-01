import { Order } from '#/core/domain/entities/order.entity';

export class Client {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;
    public order?: Order[];

    constructor(id: string, name: string, cpf: string, email: string, orders?: Order[]) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        if (orders) this.order = orders;
    }
}
