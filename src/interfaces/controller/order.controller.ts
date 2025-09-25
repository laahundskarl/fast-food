import { OrderStatus } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
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
import { TYPES } from '#/infrastructure/config/types';
import { IOrderController } from '#/interfaces/controller/types/order';
import { OrderPresenter } from '#/interfaces/presenter/order.presenter';
import { httpPresenter } from '#/interfaces/presenter/shared/http.presenter';

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

    async create(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as CreateOrderDto;
        const result = await this.createOrderUseCase.execute(body);
        return reply.status(201).send(httpPresenter(OrderPresenter.createOrderPresenter(result), 201));
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        await this.deleteOrderUseCase.execute(request.params.id);
        return reply.send(httpPresenter({ message: 'Order deleted successfully' }, 200));
    }

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const result = await this.getOrderUseCase.execute(request.params.id);
        return reply.send(httpPresenter(OrderPresenter.getOrderPresenter(result), 200));
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ListOrderRequestDto;
        const result = await this.listOrderUseCase.execute(query);
        return reply.send(httpPresenter(OrderPresenter.findOrdersPresenter(result), 200));
    }

    async update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const body = request.body as UpdateOrderDto;
        const result = await this.updateOrderUseCase.execute(request.params.id, body);
        return reply.send(httpPresenter(OrderPresenter.createOrderPresenter(result), 200));
    }

    async updateStatus(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { status } = request.body as { status: OrderStatus };
        const result = await this.updateOrderStatusUseCase.execute(request.params.id, status);
        return reply.send(httpPresenter(OrderPresenter.createOrderPresenter(result), 200));
    }
}
