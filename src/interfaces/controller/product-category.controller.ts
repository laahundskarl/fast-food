import { inject, injectable } from 'inversify';

import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IProductCategoryController } from '#/interfaces/controller/types/product-category';
import { ProductCategoryResponseDTO } from '#/interfaces/presenter/product-category/product-category-response.dto';
import { ProductCategoryPresenter } from '#/interfaces/presenter/product-category/product-category.presenter';

@injectable()
export class ProductCategoryController implements IProductCategoryController {
    constructor(
        @inject(TYPES.GetProductCategoryUseCase) private readonly getProductCategoryUseCase: IGetProductCategoryUseCase,
        @inject(TYPES.ListProductCategoryUseCase)
        private readonly listProductCategoryUseCase: IListProductCategoryUseCase,
    ) {}

    async get(id: string, includes: string[]): Promise<ProductCategoryResponseDTO> {
        const response = await this.getProductCategoryUseCase.execute(id, includes);
        return ProductCategoryPresenter.toDTO(response);
    }

    async list(query: ListProductCategoryDto): Promise<ProductCategoryResponseDTO[]> {
        const response = await this.listProductCategoryUseCase.execute(query);
        return response.map(item => ProductCategoryPresenter.toDTO(item));
    }
}
