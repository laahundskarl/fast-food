import { OrderCreateDto } from '#/dto/order.dto';
import { OrderProduct } from '#/entities/order-product.entity';
import { Order } from '#/entities/order.entity';
import { Payment } from '#/entities/payment.entity';
import { NotFoundError } from '#/errors/app-error';
import { OrderRepository } from '#/repositories/order.repository';
import { ProductRepository } from '#/repositories/product.repository';

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
            return new OrderProduct({
                amount: item.quantity,
                value: product!.value,
                productId: product!.id,
                products: product,
            });
        });
        const payment = new Payment({ externalReference: null, qrCode: null });
        const order = new Order({
            value: totalValue,
            clientId: request.clientId,
            orderProducts,
            payments: [payment],
        });
        return await this.orderRepository.create(order);
    }
}
