import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderUpdateDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class UpdateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string, order: OrderUpdateDTO): Promise<any> {
        return await this.orderRepository.update(id, order);
    }
}
