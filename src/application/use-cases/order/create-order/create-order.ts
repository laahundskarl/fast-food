import { OrderStatus, StatusPayment } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { ICreateOrderUseCase } from '#/application/use-cases/order/create-order/create-order.use-case';
import { OrderProduct } from '#/domain/entities/order-product.entity';
import { Order } from '#/domain/entities/order.entity';
import { Payment } from '#/domain/entities/payment.entity';
import { NotFoundError } from '#/domain/errors';
import { ICreatePayment } from '#/domain/gateways/create-payment';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class CreateOrder implements ICreateOrderUseCase {
    constructor(
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
        @inject(TYPES.ClientRepository) private readonly clientRepository: IClientRepository,
        @inject(TYPES.CreatePaymentGateway) private readonly paymentGateway: ICreatePayment,
        @inject(TYPES.PaymentRepository) private readonly paymentRepository: IPaymentRepository,
    ) {}

    async execute(request: CreateOrderDto): Promise<Order> {
        const productIds = request.orderProducts.map(item => item.productId);
        const products = await this.productRepository.findMany(productIds);

        if (products.length !== productIds.length) {
            throw new NotFoundError('One or more products not found');
        }

        if (request.orderProducts.some(item => item.quantity <= 0)) {
            throw new Error('Product quantity must be greater than 0');
        }

        let totalValue = 0;
        const orderProducts = request.orderProducts.map(item => {
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

        const newOrder = new Order({
            value: totalValue,
            orderNumber: 0,
            status: OrderStatus.WAITING,
            orderProducts: orderProducts,
        });

        if (request.clientId) {
            const client = await this.clientRepository.findById(request.clientId);
            if (!client) {
                throw new NotFoundError(`Client with id ${request.clientId} not found`);
            }
            newOrder.client = client;
        }

        const order = await this.orderRepository.create(newOrder);

        const gatewayResponse = await this.paymentGateway.execute({
            orderId: order.id,
            items: order.orderProducts!,
            amount: totalValue,
        });

        const newPayment = new Payment({
            status: StatusPayment.PENDING,
            order: order,
            externalReference: gatewayResponse.externalReference,
            qrCode: gatewayResponse.qrCode,
        });
        const payment = await this.paymentRepository.create(newPayment);
        order.payments = [payment];

        return order;
    }
}
