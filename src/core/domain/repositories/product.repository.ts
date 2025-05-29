import { ProductCreateDTO, ProductListDTO, ProductUpdateDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export interface ProductRepository {
    list(query?: ProductListDTO): Promise<any>;
    get(id: string): Promise<any>;
    create(product: ProductCreateDTO): Promise<any>;
    update(id: string, product: ProductUpdateDTO): Promise<any>;
    destroy(id: string): Promise<void>;
}
