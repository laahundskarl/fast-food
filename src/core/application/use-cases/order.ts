import { OrderUseCase } from '#/core/application/ports/order.use-case';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class Order implements OrderUseCase {
    constructor(private readonly repository: OrderRepository) {}

    async list(query: OrderListDTO): Promise<any> {
        return this.repository.list(query);
    }
}
