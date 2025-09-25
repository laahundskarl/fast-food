import { FastifyRequest, FastifyReply } from 'fastify';

import { IHttpPresenter } from '#/interfaces/controller/types/shared';
import { OrderPresenterOutput } from '#/interfaces/presenter/order.presenter';

export interface IOrderController {
    create(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter<OrderPresenterOutput>>;
    delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
    get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
    list(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
    update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
    updateStatus(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
}
