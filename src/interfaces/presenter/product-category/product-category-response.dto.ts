import { ProductResponseDTO } from '#/interfaces/presenter/product/product-response.dto';

export interface ProductCategoryResponseDTO {
    id: string;
    name: string;
    products?: ProductResponseDTO[];
}
