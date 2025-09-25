import { FastifyRequest, FastifyReply } from 'fastify';

import { IHttpPresenter } from '#/interfaces/controller/types/shared';
import { PaymentPresenterOutput } from '#/interfaces/presenter/payment.presenter';

export interface IPaymentController {
    get(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<IHttpPresenter<PaymentPresenterOutput>>;
    list(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
}
