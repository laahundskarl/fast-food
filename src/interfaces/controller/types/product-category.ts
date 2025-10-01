import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { ProductCategoryResponseDTO } from '#/interfaces/presenter/product-category/product-category-response.dto';

export interface IProductCategoryController {
    get(id: string, includes: string[]): Promise<ProductCategoryResponseDTO>;
    list(query: ListProductCategoryDto): Promise<ProductCategoryResponseDTO[]>;
}
