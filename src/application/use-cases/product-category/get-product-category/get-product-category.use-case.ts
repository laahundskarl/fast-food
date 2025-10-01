import { IProductCategory } from '#/domain/entities/product-category.entity';

export interface IGetProductCategoryUseCase {
    execute(id: string, includes: string[]): Promise<IProductCategory>;
}
