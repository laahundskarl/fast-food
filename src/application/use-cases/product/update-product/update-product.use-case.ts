import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';
import { IProduct } from '#/domain/entities/product.entity';

export interface IUpdateProductUseCase {
    execute(id: string, request: UpdateProductDto): Promise<IProduct>;
}
