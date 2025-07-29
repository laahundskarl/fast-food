import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class ProductCategoryController {
    constructor(
        @inject(TYPES.GetProductCategoryUseCase) private readonly getProductCategoryUseCase: IGetProductCategoryUseCase,
        @inject(TYPES.ListProductCategoryUseCase)
        private readonly listProductCategoryUseCase: IListProductCategoryUseCase,
    ) {}

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const result = await this.getProductCategoryUseCase.execute(request.params.id);
        return reply.send(result);
    }

    async list(request: FastifyRequest<{ Querystring: ListProductCategoryDto }>, reply: FastifyReply) {
        const result = await this.listProductCategoryUseCase.execute(request.query);
        return reply.send(result);
    }
}
