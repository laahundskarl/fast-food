import { ProductListDto } from '#/dto/product.dto';
import { CreateProduct, Product } from '#/entities/product.entity';

export interface IProductRepository {
    create(product: CreateProduct): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findMany(ids: string[]): Promise<Product[]>;
    list(query?: ProductListDto): Promise<Product[]>;
    update(id: string, product: Product): Promise<Product>;
    destroy(id: string): Promise<void>;
}
