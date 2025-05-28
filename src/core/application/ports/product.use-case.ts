import { ProductCreateDTO, ProductListDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export interface ProductUseCase {
    list(query?: ProductListDTO): Promise<any>;
    get(id: string): Promise<any>;
    create(product: ProductCreateDTO): Promise<any>;
}
