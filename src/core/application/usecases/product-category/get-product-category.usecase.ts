import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';

export class GetProductCategoryUseCase {
    constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

    async execute(id: string): Promise<any> {
        return await this.productCategoryRepository.get(id);
    }
}
