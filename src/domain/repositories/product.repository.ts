import { Product } from '#/domain/entities/product.entity';
import { ProductFilterDto } from '#/domain/repositories/dto/product-filter.dto';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findMany(ids: string[]): Promise<Product[]>;
    list(query?: ProductFilterDto): Promise<Product[]>;
    update(id: string, product: Product): Promise<Product>;
    destroy(id: string): Promise<void>;
}
