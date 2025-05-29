import { DataSource, ILike, Repository } from 'typeorm';

import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { AppDataSource } from '#/database/typeorm.config';
import { ProductCategoryListDTO } from '#/infrastructure/adapters/dto/product-category-list.dto';

export class TypeormProductCategoryRepository implements ProductCategoryRepository {
    private dataSource: DataSource;
    private productCategoryRepository: Repository<ProductCategory>;

    constructor() {
        this.dataSource = AppDataSource;
        this.productCategoryRepository = this.dataSource.getRepository(ProductCategory);
    }

    list(query?: ProductCategoryListDTO): any {
        return this.productCategoryRepository.find({
            where: {
                ...(query?.name && { name: ILike(`%${query.name}%`) }),
            },
            relations: {
                products: true,
            },
        });
    }

    get(id: string): any {
        return this.productCategoryRepository.findOne({
            where: { id },
            relations: {
                products: true,
            },
        });
    }
}
