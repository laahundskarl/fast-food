import { Product } from '#/core/domain/entities/product.entity';
import { ProductListDto } from '#/infrastructure/adapters/dto/product.dto';

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findMany(ids: string[]): Promise<Product[]>;
    list(query?: ProductListDto): Promise<Product[]>;
    update(id: string, product: Product): Promise<Product>;
    destroy(id: string): Promise<void>;
}
