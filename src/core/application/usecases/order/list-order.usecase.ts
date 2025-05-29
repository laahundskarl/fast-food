import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class ListOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(query?: OrderListDTO): Promise<any> {
        return await this.orderRepository.list(query);
    }
}
