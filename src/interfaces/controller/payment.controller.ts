import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IGetPaymentUseCase } from '#/application/use-cases/payment/get-payment/get-payment.use-case';
import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { IListPaymentUseCase } from '#/application/use-cases/payment/list-payment/list-payment.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IPaymentController } from '#/interfaces/controller/types/payment';
import { PaymentPresenter } from '#/interfaces/presenter/payment.presenter';
import { httpPresenter } from '#/interfaces/presenter/shared/http.presenter';

@injectable()
export class PaymentController implements IPaymentController {
    constructor(
        @inject(TYPES.GetPaymentUseCase) private readonly getPaymentUseCase: IGetPaymentUseCase,
        @inject(TYPES.ListPaymentUseCase) private readonly listPaymentUseCase: IListPaymentUseCase,
    ) {}

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const payment = await this.getPaymentUseCase.execute(request.params.id);
        return reply.send(httpPresenter(PaymentPresenter.getPaymentPresenter(payment), 200));
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ListPaymentDto;
        const payments = await this.listPaymentUseCase.execute(query);
        return reply.send(httpPresenter(PaymentPresenter.findPaymentsPresenter(payments), 200));
    }
}
