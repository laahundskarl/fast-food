import { Order } from '#/core/domain/entities/order.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class GetOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        return order;
    }
}
