import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IGetPaymentUseCase } from '#/application/use-cases/payment/get-payment/get-payment.use-case';
import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IListPaymentUseCase } from '#/application/use-cases/payment/list-payment/list-payment.use-case';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class PaymentController {
    constructor(
        @inject(TYPES.GetPaymentUseCase) private readonly getPaymentUseCase: IGetPaymentUseCase,
        @inject(TYPES.ListPaymentUseCase) private readonly listPaymentUseCase: IListPaymentUseCase,
    ) {}

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const payment = await this.getPaymentUseCase.execute(request.params.id);
        return reply.send(payment);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ListPaymentDto;
        const payment = await this.listPaymentUseCase.execute(query);
        return reply.send(payment);
    }
}
