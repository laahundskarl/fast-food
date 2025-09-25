import { FastifyRequest, FastifyReply } from 'fastify';

import { IHttpPresenter } from '#/interfaces/controller/types/shared';
import { ProductPresenterOutput } from '#/interfaces/presenter/product.presenter';

export interface IProductController {
    create(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter<ProductPresenterOutput>>;
    delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
    get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
    list(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter>;
    update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<IHttpPresenter>;
}
