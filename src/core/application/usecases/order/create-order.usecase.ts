import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderCreateDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class CreateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(order: OrderCreateDTO): Promise<any> {
        return await this.orderRepository.create(order);
    }
}
