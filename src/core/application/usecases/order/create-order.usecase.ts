import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Order } from '#/core/domain/entities/order.entity';
import { Payment } from '#/core/domain/entities/payment.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { OrderCreateDto } from '#/infrastructure/adapters/dto/order.dto';

export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(request: OrderCreateDto): Promise<Order> {
        const products = await this.productRepository.findMany(request.orderProducts.map(item => item.productId));
        if (products.length < 1) {
            throw new NotFoundError('No products found');
        }
        let totalValue = 0;
        const orderProducts = request.orderProducts.map(item => {
            const product = products.find(p => p.id === item.productId);
            totalValue += product!.value * item.quantity;
            return new OrderProduct(item.quantity, product!.value, product!.id, undefined, product);
        });
        const payment = new Payment(null, null);
        const order = new Order(
            totalValue,
            undefined,
            undefined,
            request.clientId,
            undefined,
            undefined,
            orderProducts,
            [payment],
        );
        return await this.orderRepository.create(order);
    }
}
