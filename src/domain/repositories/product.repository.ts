import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { IProduct } from '#/domain/entities/product.entity';

export interface IProductRepository {
    create(product: IProduct): Promise<IProduct>;
    findById(id: string): Promise<IProduct | null>;
    findMany(ids: string[]): Promise<IProduct[]>;
    list(query?: ListProductDto): Promise<IProduct[]>;
    update(id: string, product: IProduct): Promise<IProduct>;
    destroy(id: string): Promise<void>;
}
