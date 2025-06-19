import { ProductCategoryListDto } from '#/dto/product-category.dto';
import { ProductCategory } from '#/entities/product-category.entity';
import { ProductCategoryRepository } from '#/repositories/product-category.repository';

export class ListProductCategoryUseCase {
    constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

    async execute(query?: ProductCategoryListDto): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.list(query);
    }
}
