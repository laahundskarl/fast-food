import { ProductUseCase } from '#/core/application/ports/product.use-case';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductCreateDTO, ProductListDTO, ProductUpdateDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export class Product implements ProductUseCase {
    constructor(private readonly repository: ProductRepository) {}

    async list(query: ProductListDTO): Promise<any> {
        return this.repository.list(query);
    }

    async get(id: string): Promise<any> {
        return this.repository.get(id);
    }

    async create(product: ProductCreateDTO): Promise<any> {
        return this.repository.create(product);
    }

    async update(id: string, product: ProductUpdateDTO): Promise<any> {
        return this.repository.update(id, product);
    }

    async destroy(id: string): Promise<void> {
        return this.repository.destroy(id);
    }
}
