import { FastifyReply, FastifyRequest } from 'fastify';

import { FindPaymentByIdUseCase } from '#/core/application/usecases/payment/find-payment.usecase';
import { ListPaymentUseCase } from '#/core/application/usecases/payment/list-payment.usecase';
import { UpdatePaymentUseCase } from '#/core/application/usecases/payment/update-payment-usecase';
import { globalPrismaClient } from '#/database/prisma';
import { PaymentListDto, PaymentUpdateDto } from '#/infrastructure/adapters/dto/payment.dto';
import { PrismaOrderRepository } from '#/infrastructure/persistence/prisma/prisma-order.repository';
import { PrismaPaymentRepository } from '#/infrastructure/persistence/prisma/prisma-payment.repository';

export class PaymentController {
    private readonly paymentRepository: PrismaPaymentRepository;
    private readonly orderRepository: PrismaOrderRepository;

    constructor() {
        this.paymentRepository = new PrismaPaymentRepository(globalPrismaClient);
        this.orderRepository = new PrismaOrderRepository(globalPrismaClient);
    }

    async list(request: FastifyRequest<{ Querystring: PaymentListDto }>, reply: FastifyReply) {
        const useCase = new ListPaymentUseCase(this.paymentRepository);
        const payment = await useCase.execute(request.query);
        return reply.send(payment);
    }

    async update(request: FastifyRequest<{ Params: { id: string }; Body: PaymentUpdateDto }>, reply: FastifyReply) {
        const useCase = new UpdatePaymentUseCase(this.paymentRepository, this.orderRepository);
        const payment = await useCase.execute(request.params.id, request.body);
        return reply.send(payment);
    }

    async findById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new FindPaymentByIdUseCase(this.paymentRepository);
        const payment = await useCase.execute(request.params.id);
        return reply.send(payment);
    }
}
