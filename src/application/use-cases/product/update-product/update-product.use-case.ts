import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';

export interface IUpdateProductUseCase {
    execute(id: string, request: UpdateProductDto): Promise<any>;
}
