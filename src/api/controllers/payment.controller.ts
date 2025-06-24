import { FastifyReply, FastifyRequest } from 'fastify';

import { PaymentListDto, PaymentUpdateDto } from '#/dto/payment.dto';
import { OrderRepository } from '#/repositories/order.repository';
import { PaymentRepository } from '#/repositories/payment.repository';
import { FindPaymentByIdUseCase } from '#/usecases/payment/find-payment.usecase';
import { ListPaymentUseCase } from '#/usecases/payment/list-payment.usecase';
import { UpdatePaymentUseCase } from '#/usecases/payment/update-payment-usecase';

export class PaymentController {
    private readonly paymentRepository: PaymentRepository;
    private readonly orderRepository: OrderRepository;

    constructor(paymentRepository: PaymentRepository, orderRepository: OrderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
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
