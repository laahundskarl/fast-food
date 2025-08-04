import { inject, injectable } from 'inversify';

import { ClientOrchestrationService } from '#/application/services/client-orchestration.service';
import { PaymentOrchestrationService } from '#/application/services/payment-orchestration.service';
import { ProductOrchestrationService } from '#/application/services/product-orchestration.service';
import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { ICreateOrderUseCase } from '#/application/use-cases/order/create-order/create-order.use-case';
import { Order } from '#/domain/entities/order.entity';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { OrderBuilderService } from '#/domain/services/order-builder.service';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class CreateOrder implements ICreateOrderUseCase {
    constructor(
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
        @inject(TYPES.ProductOrchestrationService) private readonly productService: ProductOrchestrationService,
        @inject(TYPES.ClientOrchestrationService) private readonly clientService: ClientOrchestrationService,
        @inject(TYPES.PaymentOrchestrationService) private readonly paymentService: PaymentOrchestrationService,
    ) {}

    async execute(request: CreateOrderDto): Promise<Order> {
        const products = await this.productService.validateAndGetProducts(request.orderProducts);

        const { orderProducts, totalValue } = OrderBuilderService.buildOrderProducts(request.orderProducts, products);

        const order = OrderBuilderService.createOrder(orderProducts, totalValue);

        order.client = await this.clientService.getClientIfExists(request.clientId);

        const savedOrder = await this.orderRepository.create(order);

        const payment = await this.paymentService.createPaymentForOrder(savedOrder);
        savedOrder.payments = [payment];

        return savedOrder;
    }
}
