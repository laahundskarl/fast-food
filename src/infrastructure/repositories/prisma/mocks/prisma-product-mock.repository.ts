import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { IProduct } from '#/domain/entities/product.entity';
import { IProductRepository } from '#/domain/repositories/product.repository';

export class PrismaProductMockRepository implements IProductRepository {
    async create(product: IProduct): Promise<IProduct> {
        return Promise.resolve(product);
    }

    async findById(_id: string): Promise<IProduct | null> {
        return Promise.resolve(null);
    }

    async findMany(_ids: string[]): Promise<IProduct[]> {
        return Promise.resolve([]);
    }

    async list(_query?: ListProductDto): Promise<IProduct[]> {
        return Promise.resolve([]);
    }

    async update(_id: string, product: IProduct): Promise<IProduct> {
        return Promise.resolve(product);
    }

    async destroy(_id: string): Promise<void> {
        return Promise.resolve();
    }
}
