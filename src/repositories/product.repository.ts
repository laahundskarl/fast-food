import { ProductListDto } from '#/dto/product.dto';
import { Product } from '#/entities/product.entity';

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findMany(ids: string[]): Promise<Product[]>;
    list(query?: ProductListDto): Promise<Product[]>;
    update(id: string, product: Product): Promise<Product>;
    destroy(id: string): Promise<void>;
}
