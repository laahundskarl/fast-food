import { OrderStatus } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Order } from '#/core/domain/entities/order.entity';
import { Payment } from '#/core/domain/entities/payment.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { BusinessError, NotFoundError } from '#/core/shared/errors/app-error';
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
                return new OrderProduct(item.quantity, product!.value, product!.id, undefined, product);
            });
            const payment = new Payment(null, null);
            const updateOrder = new Order(
                totalValue,
                order.status,
                order.orderNumber,
                order.clientId,
                id,
                undefined,
                orderProducts,
                [payment],
            );
            return await this.orderRepository.updateOrderProducts(id, updateOrder);
        }

        console.log(request);
        const updateOrder = new Order(
            order.value,
            request.status ? OrderStatus[request.status as OrderStatus] : order.status,
            order.orderNumber,
            order.clientId,
            id,
            undefined,
            order.orderProducts,
            order.payments,
        );
        return await this.orderRepository.updateStatus(id, updateOrder);
    }
}
