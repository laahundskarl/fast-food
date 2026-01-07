import { vi } from 'vitest';

import { ProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryFiltersDto } from '#/domain/repositories/dto/product-category-filters.dto';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';

export class PrismaProductCategoryMockRepository implements IProductCategoryRepository {
    async findById(_id: string, _includes: string[]): Promise<ProductCategory | null> {
        return Promise.resolve(null);
    }

    async list(_query?: ProductCategoryFiltersDto): Promise<ProductCategory[]> {
        return Promise.resolve([]);
    }
}

const categoryMock = new ProductCategory({
    id: '1',
    name: 'Beverages',
});

type MockOptions = {
    data?: ProductCategory;
    empty?: boolean;
};

type MockListOptions = {
    data?: ProductCategory[];
};

export function mockProductCategoryFindById({ data = categoryMock, empty }: MockOptions = {}) {
    return vi
        .spyOn(PrismaProductCategoryMockRepository.prototype, 'findById')
        .mockResolvedValueOnce(empty ? null : data);
}

export function mockProductCategoryList({ data = [categoryMock] }: MockListOptions = {}) {
    return vi.spyOn(PrismaProductCategoryMockRepository.prototype, 'list').mockResolvedValueOnce(data);
}
