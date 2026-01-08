import { vi } from 'vitest';

import { ProductCategory } from '#/domain/entities/product-category.entity';
import { Product } from '#/domain/entities/product.entity';
import { ProductFilterDto } from '#/domain/repositories/dto/product-filter.dto';
import { IProductRepository } from '#/domain/repositories/product.repository';

export class PrismaProductMockRepository implements IProductRepository {
    async create(product: Product): Promise<Product> {
        return Promise.resolve(product);
    }

    async findById(_id: string): Promise<Product | null> {
        return Promise.resolve(null);
    }

    async findMany(_ids: string[]): Promise<Product[]> {
        return Promise.resolve([]);
    }

    async list(_query?: ProductFilterDto): Promise<Product[]> {
        return Promise.resolve([]);
    }

    async update(_id: string, product: Product): Promise<Product> {
        return Promise.resolve(product);
    }

    async destroy(_id: string): Promise<void> {
        return Promise.resolve();
    }
}

const categoryMock = new ProductCategory({
    id: '1',
    name: 'Beverages',
});

const productMock = new Product({
    id: '1',
    name: 'Coca-Cola',
    value: 5.99,
    description: 'Refreshing beverage',
    category: categoryMock,
});

type MockOptions = {
    data?: Product;
    empty?: boolean;
};

type MockListOptions = {
    data?: Product[];
};

export function mockProductCreate({ data = productMock }: MockOptions = {}) {
    return vi.spyOn(PrismaProductMockRepository.prototype, 'create').mockResolvedValueOnce(data);
}

export function mockProductFindById({ data = productMock, empty }: MockOptions = {}) {
    return vi.spyOn(PrismaProductMockRepository.prototype, 'findById').mockResolvedValueOnce(empty ? null : data);
}

export function mockProductFindMany({ data = [productMock] }: MockListOptions = {}) {
    return vi.spyOn(PrismaProductMockRepository.prototype, 'findMany').mockResolvedValueOnce(data);
}

export function mockProductList({ data = [productMock] }: MockListOptions = {}) {
    return vi.spyOn(PrismaProductMockRepository.prototype, 'list').mockResolvedValueOnce(data);
}

export function mockProductUpdate({ data = productMock }: MockOptions = {}) {
    return vi.spyOn(PrismaProductMockRepository.prototype, 'update').mockResolvedValueOnce(data);
}

export function mockProductDestroy() {
    return vi.spyOn(PrismaProductMockRepository.prototype, 'destroy').mockResolvedValueOnce();
}
