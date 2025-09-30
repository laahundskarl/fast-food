import { inject, injectable } from 'inversify';

import { IClientOrchestrationService } from '#/application/services/interfaces/client-orchestration.service';
import { IPaymentOrchestrationService } from '#/application/services/interfaces/payment-orchestration.service';
import { IProductOrchestrationService } from '#/application/services/interfaces/product-orchestration.service';
import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { ICreateOrderUseCase } from '#/application/use-cases/order/create-order/create-order.use-case';
import { IOrder } from '#/domain/entities/order.entity';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { OrderBuilderService } from '#/domain/services/order-builder.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class CreateOrder implements ICreateOrderUseCase {
    constructor(
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
        @inject(TYPES.ProductOrchestrationService) private readonly productService: IProductOrchestrationService,
        @inject(TYPES.ClientOrchestrationService) private readonly clientService: IClientOrchestrationService,
        @inject(TYPES.PaymentOrchestrationService) private readonly paymentService: IPaymentOrchestrationService,
    ) {}

    async execute(request: CreateOrderDto): Promise<IOrder> {
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
