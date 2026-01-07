import { vi } from 'vitest';

import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IProductCategory, ProductCategory } from '#/domain/entities/product-category.entity';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';

export class PrismaProductCategoryMockRepository implements IProductCategoryRepository {
    async findById(_id: string, _includes: string[]): Promise<IProductCategory | null> {
        return Promise.resolve(null);
    }

    async list(_query?: ListProductCategoryDto): Promise<IProductCategory[]> {
        return Promise.resolve([]);
    }
}

const categoryMock = new ProductCategory({
    id: '1',
    name: 'Beverages',
});

type MockOptions = {
    data?: IProductCategory;
    empty?: boolean;
};

type MockListOptions = {
    data?: IProductCategory[];
};

export function mockProductCategoryFindById({ data = categoryMock, empty }: MockOptions = {}) {
    return vi
        .spyOn(PrismaProductCategoryMockRepository.prototype, 'findById')
        .mockResolvedValueOnce(empty ? null : data);
}

export function mockProductCategoryList({ data = [categoryMock] }: MockListOptions = {}) {
    return vi.spyOn(PrismaProductCategoryMockRepository.prototype, 'list').mockResolvedValueOnce(data);
}
