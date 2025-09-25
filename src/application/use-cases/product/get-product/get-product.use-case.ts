import { IProduct } from '#/domain/entities/product.entity';

export interface IGetProductUseCase {
    execute(id: string): Promise<IProduct>;
}
