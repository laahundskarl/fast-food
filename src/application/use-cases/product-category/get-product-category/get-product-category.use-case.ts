import { ProductCategory } from '#/domain/entities/product-category.entity';

export interface IGetProductCategoryUseCase {
    execute(id: string, include?: string[]): Promise<ProductCategory>;
}
