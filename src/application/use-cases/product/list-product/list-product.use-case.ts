import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { Product } from '#/domain/entities/product.entity';

export interface IListProductUseCase {
    execute(query?: ListProductDto): Promise<Product[]>;
}
