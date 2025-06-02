import { Order } from '#/core/domain/entities/order.entity';

export class Client {
    constructor(
        public name: string,
        public cpf: string,
        public email: string,
        public readonly id?: string,
        public orders?: Order[],
    ) {}
}
