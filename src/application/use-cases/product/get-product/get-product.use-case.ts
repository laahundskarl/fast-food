import { Product } from '#/domain/entities/product.entity';

export interface IGetProductUseCase {
    execute(id: string): Promise<Product>;
}
