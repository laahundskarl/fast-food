import { inject, injectable } from 'inversify';

import { CreateProductDto } from '#/application/use-cases/product/create-product/create-product.dto';
import { ICreateProductUseCase } from '#/application/use-cases/product/create-product/create-product.use-case';
import { IDeleteProductUseCase } from '#/application/use-cases/product/delete-product/delete-product.use-case';
import { IGetProductUseCase } from '#/application/use-cases/product/get-product/get-product.use-case';
import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { IListProductUseCase } from '#/application/use-cases/product/list-product/list-product.use-case';
import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';
import { IUpdateProductUseCase } from '#/application/use-cases/product/update-product/update-product.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IProductController } from '#/interfaces/controller/types/product';
import { ProductResponseDTO } from '#/interfaces/presenter/product/product-response.dto';
import { ProductPresenter } from '#/interfaces/presenter/product/product.presenter';

@injectable()
export class ProductController implements IProductController {
    constructor(
        @inject(TYPES.CreateProductUseCase) private readonly createProductUseCase: ICreateProductUseCase,
        @inject(TYPES.DeleteProductUseCase) private readonly deleteProductUseCase: IDeleteProductUseCase,
        @inject(TYPES.GetProductUseCase) private readonly getProductUseCase: IGetProductUseCase,
        @inject(TYPES.ListProductUseCase) private readonly listProductUseCase: IListProductUseCase,
        @inject(TYPES.UpdateProductUseCase) private readonly updateProductUseCase: IUpdateProductUseCase,
    ) {}

    async create(request: CreateProductDto): Promise<ProductResponseDTO> {
        const response = await this.createProductUseCase.execute(request);
        return ProductPresenter.toDTO(response);
    }

    async delete(id: string): Promise<void> {
        await this.deleteProductUseCase.execute(id);
    }

    async get(id: string): Promise<ProductResponseDTO> {
        const response = await this.getProductUseCase.execute(id);
        return ProductPresenter.toDTO(response);
    }

    async list(query: ListProductDto): Promise<ProductResponseDTO[]> {
        const response = await this.listProductUseCase.execute(query);
        return response.map(item => ProductPresenter.toDTO(item));
    }

    async update(id: string, request: UpdateProductDto): Promise<ProductResponseDTO> {
        const result = await this.updateProductUseCase.execute(id, request);
        return ProductPresenter.toDTO(result);
    }
}
