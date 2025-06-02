import { Order } from '#/core/domain/entities/order.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class ListOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    execute(query?: OrderListDTO): Promise<Order[]> {
        return this.orderRepository.list(query);
    }
}
