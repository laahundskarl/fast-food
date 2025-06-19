import { OrderStatus } from '@prisma/client';

import { OrderUpdateDto } from '#/dto/order.dto';
import { OrderProduct } from '#/entities/order-product.entity';
import { Order } from '#/entities/order.entity';
import { Payment } from '#/entities/payment.entity';
import { Product } from '#/entities/product.entity';
import { BusinessError, NotFoundError } from '#/errors/app-error';
import { OrderRepository } from '#/repositories/order.repository';
import { ProductRepository } from '#/repositories/product.repository';

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
        if (order.status !== OrderStatus.WAITING) {
            throw new BusinessError(400, `The order is ${order.status.toLowerCase()} already`);
        }

        let products: Product[];
        if (request.orderProducts) {
            products = await this.productRepository.findMany(request.orderProducts.map(item => item.productId));
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
            const updateOrder = new Order({
                value: totalValue,
                status: order.status,
                orderNumber: order.orderNumber,
                clientId: order.clientId,
                id,
                orderProducts,
                payments: [payment],
            });
            return await this.orderRepository.updateOrderProducts(id, updateOrder);
        }

        const updateOrder = new Order({
            value: order.value,
            status: request.status ? OrderStatus[request.status as OrderStatus] : order.status,
            orderNumber: order.orderNumber,
            clientId: order.clientId,
            id,
            orderProducts: order.orderProducts,
            payments: order.payments,
        });
        return await this.orderRepository.updateStatus(id, updateOrder);
    }
}
