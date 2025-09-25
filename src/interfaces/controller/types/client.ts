import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';

import { IHttpPresenter } from '#/interfaces/controller/types/shared';
import { ClientPresenterOutput } from '#/interfaces/presenter/client.presenter';

export interface IClientController {
    create(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter<ClientPresenterOutput>>;
    delete(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
    get(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
    getOrders(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
    update(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
}
