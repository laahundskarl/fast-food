import { Product } from '#/domain/entities/product.entity';

export interface IFindManyProductsUseCase {
    execute(ids: string[]): Promise<Product[]>;
}
