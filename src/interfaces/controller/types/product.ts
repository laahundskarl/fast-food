import { CreateProductDto } from '#/application/use-cases/product/create-product/create-product.dto';
import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';
import { ProductResponseDTO } from '#/interfaces/presenter/product/product-response.dto';

export interface IProductController {
    create(request: CreateProductDto): Promise<ProductResponseDTO>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<ProductResponseDTO>;
    list(query: ListProductDto): Promise<ProductResponseDTO[]>;
    update(id: string, request: UpdateProductDto): Promise<ProductResponseDTO>;
}
