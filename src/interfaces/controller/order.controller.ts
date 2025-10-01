import { OrderStatus } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { ICreateOrderUseCase } from '#/application/use-cases/order/create-order/create-order.use-case';
import { IDeleteOrderUseCase } from '#/application/use-cases/order/delete-order/delete-order.use-case';
import { IGetOrderUseCase } from '#/application/use-cases/order/get-order/get-order.use-case';
import { ListOrderRequestDto } from '#/application/use-cases/order/list-order/list-order.dto';
import { IListOrderUseCase } from '#/application/use-cases/order/list-order/list-order.use-case';
import { UpdateOrderDto } from '#/application/use-cases/order/update-order/update-order.dto';
import { IUpdateOrderUseCase } from '#/application/use-cases/order/update-order/update-order.use-case';
import { IUpdateOrderStatusUseCase } from '#/application/use-cases/order/update-order-status/update-order-status.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IOrderController } from '#/interfaces/controller/types/order';
import { OrderResponseDTO } from '#/interfaces/presenter/order/order-response.dto';
import { OrderPresenter } from '#/interfaces/presenter/order/order.presenter';

@injectable()
export class OrderController implements IOrderController {
    constructor(
        @inject(TYPES.CreateOrderUseCase) private readonly createOrderUseCase: ICreateOrderUseCase,
        @inject(TYPES.DeleteOrderUseCase) private readonly deleteOrderUseCase: IDeleteOrderUseCase,
        @inject(TYPES.GetOrderUseCase) private readonly getOrderUseCase: IGetOrderUseCase,
        @inject(TYPES.ListOrderUseCase) private readonly listOrderUseCase: IListOrderUseCase,
        @inject(TYPES.UpdateOrderUseCase) private readonly updateOrderUseCase: IUpdateOrderUseCase,
        @inject(TYPES.UpdateOrderStatusUseCase) private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase,
    ) {}

    async create(request: CreateOrderDto): Promise<OrderResponseDTO> {
        const response = await this.createOrderUseCase.execute(request);
        return OrderPresenter.toDTO(response);
    }

    async delete(id: string): Promise<void> {
        await this.deleteOrderUseCase.execute(id);
    }

    async get(id: string): Promise<OrderResponseDTO> {
        const response = await this.getOrderUseCase.execute(id);
        return OrderPresenter.toDTO(response);
    }

    async list(query: ListOrderRequestDto): Promise<OrderResponseDTO[]> {
        const response = await this.listOrderUseCase.execute(query);
        return response.map(item => OrderPresenter.toDTO(item));
    }

    async update(id: string, request: UpdateOrderDto): Promise<OrderResponseDTO> {
        const response = await this.updateOrderUseCase.execute(id, request);
        return OrderPresenter.toDTO(response);
    }

    async updateStatus(id: string, status: OrderStatus): Promise<OrderResponseDTO> {
        const response = await this.updateOrderStatusUseCase.execute(id, status);
        return OrderPresenter.toDTO(response);
    }
}
