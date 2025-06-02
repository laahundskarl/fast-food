import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { OrderUpdateDto } from '#/infrastructure/adapters/dto/order.dto';

export class UpdateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(id: string, request: OrderUpdateDto): Promise<any> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        // Corrigir Update
        // if (order.payments)

        return await this.orderRepository.update(id, order);
    }
}
