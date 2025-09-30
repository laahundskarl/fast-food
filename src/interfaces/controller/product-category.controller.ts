import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IProductCategoryController } from '#/interfaces/controller/types/product-category';
import { ProductCategoryPresenter } from '#/interfaces/presenter/product-category.presenter';
import { httpPresenter } from '#/interfaces/presenter/shared/http.presenter';

@injectable()
export class ProductCategoryController implements IProductCategoryController {
    constructor(
        @inject(TYPES.GetProductCategoryUseCase) private readonly getProductCategoryUseCase: IGetProductCategoryUseCase,
        @inject(TYPES.ListProductCategoryUseCase)
        private readonly listProductCategoryUseCase: IListProductCategoryUseCase,
    ) {}

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const result = await this.getProductCategoryUseCase.execute(request.params.id);
        return reply.send(httpPresenter(ProductCategoryPresenter.getProductCategoryPresenter(result), 200));
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ListProductCategoryDto;
        const result = await this.listProductCategoryUseCase.execute(query);
        return reply.send(httpPresenter(ProductCategoryPresenter.findProductCategoriesPresenter(result), 200));
    }
}
