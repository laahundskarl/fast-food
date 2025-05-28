import { DataSource, ILike, Repository } from 'typeorm';

import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { AppDataSource } from '#/database/typeorm.config';
import { ProductCreateDTO, ProductListDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export class TypeormProductRepository implements ProductRepository {
    private dataSource: DataSource;
    private productRepository: Repository<Product>;

    constructor() {
        this.dataSource = AppDataSource;
        this.productRepository = this.dataSource.getRepository(Product);
    }

    list(query?: ProductListDTO): any {
        return this.productRepository.find({
            where: {
                ...(query?.name && { name: ILike(`%${query.name}%`) }),
                ...(query?.categoryId && { category: { id: query.categoryId } }),
            },
            relations: {
                category: true,
            },
        });
    }

    get(id: string): any {
        return this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });
    }

    create(product: ProductCreateDTO): any {
        return this.productRepository.save(product);
    }
}
