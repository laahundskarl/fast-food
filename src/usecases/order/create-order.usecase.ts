import { OrderCreateDto } from '#/dto/order.dto';
import { CreateOrderProduct } from '#/entities/order-product.entity';
import { CreateOrder, Order } from '#/entities/order.entity';
import { CreatePayment } from '#/entities/payment.entity';
import { NotFoundError } from '#/errors/app-error';
import { IOrderRepository } from '#/repositories/order.repository';
import { IPaymentRepository } from '#/repositories/payment.repository';
import { IProductRepository } from '#/repositories/product.repository';

export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly productRepository: IProductRepository,
        private readonly paymentRepository: IPaymentRepository,
    ) {}

    async execute(request: OrderCreateDto): Promise<Order> {
        const products = await this.productRepository.findMany(request.orderProducts.map(item => item.productId));
        request.orderProducts.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                throw new NotFoundError('Product not found');
            }
        });

        let totalValue = 0;
        const orderProducts = request.orderProducts.map(item => {
            const product = products.find(p => p.id === item.productId);
            totalValue += product!.value * item.amount;
            return new CreateOrderProduct({
                amount: item.amount,
                value: product!.value,
                productId: product!.id,
            });
        });
        const order = new CreateOrder({
            clientId: request.clientId,
            orderProducts,
            total: totalValue,
        });
        const createdOrder = await this.orderRepository.create(order);
        await this.paymentRepository.create(
            new CreatePayment({ externalReference: null, qrCode: null, orderId: createdOrder.id }),
        );
        // TODO: remover any e resolver tipagem
        return (await this.orderRepository.findById(createdOrder.id)) as any as Order;
    }
}
