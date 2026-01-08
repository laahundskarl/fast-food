import { inject, injectable } from 'inversify';

import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import {
    ProductCategoryGetQueryRequest,
    ProductCategoryListQueryRequest,
} from '#/interfaces/http/schemas/product-category/product-category-request.schema';
import { ProductCategoryResponseSchema } from '#/interfaces/http/schemas/product-category/product-category-response.schema';
import { ProductCategoryPresenter } from '#/interfaces/presenter/product-category/product-category.presenter';

@injectable()
export class ProductCategoryController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.GetProductCategoryUseCase) private readonly getProductCategoryUseCase: IGetProductCategoryUseCase,
        @inject(TYPES.ListProductCategoryUseCase)
        private readonly listProductCategoryUseCase: IListProductCategoryUseCase,
    ) {}

    async get(id: string, query: ProductCategoryGetQueryRequest): Promise<ProductCategoryResponseSchema> {
        this.logger.info('Retrieving product category with ID', { id, query });
        const response = await this.getProductCategoryUseCase.execute(id, query.include);
        return ProductCategoryPresenter.toHTTP(response);
    }

    async list(query: ProductCategoryListQueryRequest): Promise<ProductCategoryResponseSchema[]> {
        this.logger.info('Listing product categories with query', { query });
        const response = await this.listProductCategoryUseCase.execute(query);
        return response.map(item => ProductCategoryPresenter.toHTTP(item));
    }
}
