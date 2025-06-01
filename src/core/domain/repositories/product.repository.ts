import { Product } from '#/core/domain/entities/product.entity';
import { ProductCreateDto, ProductListDto, ProductUpdateDto } from '#/infrastructure/adapters/dto/product.dto';

export interface ProductRepository {
    create(product: ProductCreateDto): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    list(query?: ProductListDto): Promise<Product[]>;
    update(id: string, product: ProductUpdateDto): Promise<Product>;
    destroy(id: string): Promise<void>;
}
