import { Order } from '#/entities/order.entity';
import { NotFoundError } from '#/errors/app-error';
import { OrderRepository } from '#/repositories/order.repository';

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
