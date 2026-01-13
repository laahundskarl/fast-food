import { randomUUID } from 'crypto';

export type ClientPayload = {
    id?: string;
    name: string;
    cpf: string;
    email: string;
};

export class Client {
    public readonly id: string;
    public name: string;
    public cpf: string;
    public email: string;

    constructor(payload: ClientPayload) {
        this.id = payload.id || randomUUID();
        this.name = payload.name;
        this.cpf = payload.cpf;
        this.email = payload.email;
    }
}
