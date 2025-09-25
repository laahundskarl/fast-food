import { FastifyRequest, FastifyReply } from 'fastify';

import { IHttpPresenter } from '#/interfaces/controller/types/shared';
import { ProductCategoryPresenterOutput } from '#/interfaces/presenter/product-category.presenter';

export interface IProductCategoryController {
    get(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
    ): Promise<IHttpPresenter<ProductCategoryPresenterOutput>>;
    list(request: FastifyRequest, reply: FastifyReply): Promise<IHttpPresenter<ProductCategoryPresenterOutput[]>>;
}
