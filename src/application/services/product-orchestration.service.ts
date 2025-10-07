import { inject, injectable } from 'inversify';

import { Product } from '#/domain/entities/product.entity';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ProductValidationService } from '#/domain/services/product-validation.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class ProductOrchestrationService {
    constructor(@inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository) {}

    async validateAndGetProducts(
        requestedProducts: Array<{ productId: string; quantity: number }>,
    ): Promise<Product[]> {
        ProductValidationService.validateQuantities(requestedProducts);

        const productIds = requestedProducts.map(item => item.productId);
        const products = await this.productRepository.findMany(productIds);

        ProductValidationService.validateProductsExist(requestedProducts, products);

        return products;
    }
}
