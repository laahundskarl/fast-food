import { OrderStatus, PrismaClient, StatusPayment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateOrderUseCase } from '#/core/application/usecases/order/create-order.usecase';
// import { DeleteOrderUseCase } from '#/core/application/usecases/order/delete-order.usecase';
import { GetOrderUseCase } from '#/core/application/usecases/order/get-order.usecase';
import { ListOrderUseCase } from '#/core/application/usecases/order/list-order.usecase';
import { UpdateOrderUseCase } from '#/core/application/usecases/order/update-order.usecase';
// import { CreatePaymentUseCase } from '#/core/application/usecases/payment/create-payment.usecase';
import { OrderCreateDto, OrderListRequestDto, OrderUpdateDto } from '#/infrastructure/adapters/dto/order.dto';
import { PrismaOrderRepository } from '#/infrastructure/persistence/prisma/prisma-order.repository';
// import { PrismaPaymentRepository } from '#/infrastructure/persistence/prisma/prisma-payment.repository';

export class OrderController {
    private readonly repository: PrismaOrderRepository;
    // private readonly paymentRepository: PrismaPaymentRepository;

    constructor() {
        this.repository = new PrismaOrderRepository(new PrismaClient());
        // this.paymentRepository = new PrismaPaymentRepository(new PrismaClient());
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as OrderListRequestDto;

        const useCase = new ListOrderUseCase(this.repository);

        const result = await useCase.execute({
            status: query.status ? (query.status.split(',') as OrderStatus[]) : undefined,
            clientId: query.clientId,
            productId: query.productId,
            paymentStatus: query.paymentStatus ? (query.paymentStatus.split(',') as StatusPayment[]) : undefined,
        });

        return reply.status(200).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const useCase = new GetOrderUseCase(this.repository);

        const result = await useCase.execute(id);

        return reply.status(200).send(result);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as OrderCreateDto;

        const useCase = new CreateOrderUseCase(this.repository);
        // const paymentUseCase = new CreatePaymentUseCase(this.paymentRepository);

        const result = await useCase.execute(body);
        // await paymentUseCase.execute({
        //     orderId: result.id,
        //     value: result.value ?? 0,
        //     status: StatusPayment.APPROVED,
        // });

        return reply.status(201).send(result);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const body = request.body as OrderUpdateDto;

        const useCase = new UpdateOrderUseCase(this.repository);

        const result = await useCase.execute(id, body);

        return reply.status(200).send(result);
    }
}
