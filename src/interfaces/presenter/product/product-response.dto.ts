import { ProductCategoryResponseDTO } from '#/interfaces/presenter/product-category/product-category-response.dto';

export interface ProductResponseDTO {
    id: string;
    name: string;
    value: number;
    description: string | null;
    category?: ProductCategoryResponseDTO;
}
