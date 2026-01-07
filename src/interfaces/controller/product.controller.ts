import { inject, injectable } from 'inversify';

import { ICreateProductUseCase } from '#/application/use-cases/product/create-product/create-product.use-case';
import { IDeleteProductUseCase } from '#/application/use-cases/product/delete-product/delete-product.use-case';
import { IGetProductUseCase } from '#/application/use-cases/product/get-product/get-product.use-case';
import { IListProductUseCase } from '#/application/use-cases/product/list-product/list-product.use-case';
import { IUpdateProductUseCase } from '#/application/use-cases/product/update-product/update-product.use-case';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { DeleteResponse } from '#/interfaces/http/schemas/common/util.schema';
import {
    ProductCreateRequest,
    ProductQueryRequest,
    ProductUpdateRequest,
} from '#/interfaces/http/schemas/product/product-request.schema';
import { ProductResponse } from '#/interfaces/http/schemas/product/product-response.schema';
import { ProductPresenter } from '#/interfaces/presenter/product/product.presenter';

@injectable()
export class ProductController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.CreateProductUseCase) private readonly createProductUseCase: ICreateProductUseCase,
        @inject(TYPES.DeleteProductUseCase) private readonly deleteProductUseCase: IDeleteProductUseCase,
        @inject(TYPES.GetProductUseCase) private readonly getProductUseCase: IGetProductUseCase,
        @inject(TYPES.ListProductUseCase) private readonly listProductUseCase: IListProductUseCase,
        @inject(TYPES.UpdateProductUseCase) private readonly updateProductUseCase: IUpdateProductUseCase,
    ) {}

    async create(request: ProductCreateRequest): Promise<ProductResponse> {
        this.logger.info('Creating a new product', { request });
        const response = await this.createProductUseCase.execute(request);
        return ProductPresenter.toHTTP(response);
    }

    async delete(id: string): Promise<DeleteResponse> {
        this.logger.info('Deleting product with id', { id });
        await this.deleteProductUseCase.execute(id);
        return ProductPresenter.toDeleteResponse();
    }

    async get(id: string): Promise<ProductResponse> {
        this.logger.info('Getting product with id', { id });
        const response = await this.getProductUseCase.execute(id);
        return ProductPresenter.toHTTP(response);
    }

    async list(query: ProductQueryRequest): Promise<ProductResponse[]> {
        this.logger.info('Listing products with query', { query });
        const response = await this.listProductUseCase.execute(query);
        return response.map(item => ProductPresenter.toHTTP(item));
    }

    async update(id: string, request: ProductUpdateRequest): Promise<ProductResponse> {
        this.logger.info('Updating product with id', { id, request });
        const result = await this.updateProductUseCase.execute(id, request);
        return ProductPresenter.toHTTP(result);
    }
}
