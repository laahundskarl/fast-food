import { OrderRepository } from '#/core/domain/repositories/order.repository';

export class GetOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<any> {
        return await this.orderRepository.get(id);
    }
}
