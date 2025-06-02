import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class DeleteOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<any> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        return await this.orderRepository.destroy(id);
    }
}
