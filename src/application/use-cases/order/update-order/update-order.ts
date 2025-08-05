import { OrderStatus } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { UpdateOrderDto } from '#/application/use-cases/order/update-order/update-order.dto';
import { IUpdateOrderUseCase } from '#/application/use-cases/order/update-order/update-order.use-case';
import { OrderProduct } from '#/domain/entities/order-product.entity';
import { Order } from '#/domain/entities/order.entity';
import { BusinessError, NotFoundError } from '#/domain/errors';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class UpdateOrder implements IUpdateOrderUseCase {
    constructor(
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
    ) {}

    async execute(id: string, request: UpdateOrderDto): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }

        if (request.orderProducts) {
            return await this.updateOrderProducts(id, order, request.orderProducts);
        }

        if (request.status) {
            return await this.updateOrderStatus(id, order, request.status);
        }

        return order;
    }

    private async updateOrderProducts(
        orderId: string,
        order: Order,
        orderProductsData: Array<{ productId: string; quantity: number }>,
    ): Promise<Order> {
        const productIds = orderProductsData.map(item => item.productId);
        const products = await this.productRepository.findMany(productIds);

        if (products.length !== productIds.length) {
            throw new NotFoundError('One or more products not found');
        }

        if (orderProductsData.some(item => item.quantity <= 0)) {
            throw new BusinessError(400, 'Product quantity must be greater than 0');
        }

        let totalValue = 0;
        const orderProducts = orderProductsData.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                throw new NotFoundError(`Product with id ${item.productId} not found`);
            }

            const itemValue = product.value * item.quantity;
            totalValue += itemValue;

            return new OrderProduct({
                amount: item.quantity,
                value: itemValue,
                product: product,
            });
        });

        const updatedOrder = new Order({
            id: order.id,
            value: totalValue,
            orderNumber: order.orderNumber,
            status: order.status,
            orderProducts: orderProducts,
            payments: order.payments,
            client: order.client,
        });

        return await this.orderRepository.updateOrderProducts(orderId, updatedOrder);
    }

    private async updateOrderStatus(orderId: string, order: Order, statusString: string): Promise<Order> {
        const validStatuses = Object.values(OrderStatus);
        if (!validStatuses.includes(statusString as OrderStatus)) {
            throw new BusinessError(400, `Invalid status: ${statusString}`);
        }

        const newStatus = statusString as OrderStatus;

        const updatedOrder = new Order({
            id: order.id,
            value: order.value,
            orderNumber: order.orderNumber,
            status: newStatus,
            orderProducts: order.orderProducts,
            payments: order.payments,
            client: order.client,
        });

        return await this.orderRepository.updateStatus(orderId, updatedOrder);
    }
}
