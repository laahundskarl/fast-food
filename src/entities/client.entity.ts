import { Order } from '#/entities/order.entity';

type ClientPayload = {
    name: string;
    cpf: string;
    email: string;
    id: string;
    orders?: Order[];
};

export class Client {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;

    constructor({ name, cpf, email, id }: ClientPayload) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
    }
}

export class CreateClient {
    name: string;
    cpf: string;
    email: string;

    constructor({ name, cpf, email }: { name: string; cpf: string; email: string }) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
    }
}
