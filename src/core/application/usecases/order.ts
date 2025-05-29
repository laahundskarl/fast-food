import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class Order {
    constructor(private readonly repository: OrderRepository) {}

    async list(query: OrderListDTO): Promise<any> {
        return this.repository.list(query);
    }
}
