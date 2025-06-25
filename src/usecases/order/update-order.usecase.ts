import { OrderStatus, StatusPayment } from '@prisma/client';

import { OrderUpdateDto } from '#/dto/order.dto';
import { CreateOrderProduct } from '#/entities/order-product.entity';
import { Order, UpdateOrder } from '#/entities/order.entity';
import { Product } from '#/entities/product.entity';
import { BusinessError, NotFoundError } from '#/errors/app-error';
import { IOrderRepository } from '#/repositories/order.repository';
import { IPaymentRepository } from '#/repositories/payment.repository';
import { IProductRepository } from '#/repositories/product.repository';

export class UpdateOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly productRepository: IProductRepository,
        private readonly paymentRepository: IPaymentRepository,
    ) {}

    async execute(id: string, request: OrderUpdateDto): Promise<any> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        if (order.status !== OrderStatus.WAITING) {
            throw new BusinessError(400, `The order is ${order.status.toLowerCase()} already`);
        }

        let products: Product[] = [];

        if (request.orderProducts) {
            const promises = request.orderProducts.map(async item => {
                const product = await this.productRepository.findById(item.productId);
                if (!product) {
                    throw new NotFoundError('Product not found');
                }
                return product;
            });

            products = await Promise.all(promises);

            let totalValue = 0;
            const orderProducts = request.orderProducts.map(item => {
                const product = products.find(p => p.id === item.productId);
                if (!product) {
                    throw new NotFoundError('Product not found');
                }
                totalValue += product.value * item.quantity;
                return new CreateOrderProduct({
                    productId: product.id,
                    amount: item.quantity,
                    value: product.value,
                });
            });
            const updateOrder = new UpdateOrder({
                value: totalValue,
                status: order.status,
                orderNumber: order.orderNumber,
                clientId: order.clientId,
                id,
                orderProducts,
            });
            return await this.orderRepository.updateOrderProducts(id, updateOrder);
        }

        const pendingPayment = order.payments?.find(payment => payment.status === StatusPayment.PENDING);

        if (pendingPayment) {
            await this.paymentRepository.cancelPayment(pendingPayment.id);
        }

        const updateOrder = new Order({
            value: order.value,
            status: request.status ? OrderStatus[request.status as OrderStatus] : order.status,
            orderNumber: order.orderNumber,
            clientId: order.clientId,
            id,
            orderProducts: order.orderProducts,
            payments: order.payments ?? [],
        });
        return await this.orderRepository.updateStatus(id, updateOrder.status);
    }
}
