import { IProduct } from '#/domain/entities/product.entity';
import { ProductPresenterOutput, ProductWithCategoryPresenterOutput } from '#/interfaces/presenter/product.presenter';

export interface IProductPresenter {
    createProductPresenter(product: IProduct): ProductPresenterOutput;
    findProductsPresenter(products: IProduct[]): ProductPresenterOutput[];
    getProductPresenter(product: IProduct): ProductPresenterOutput | ProductWithCategoryPresenterOutput;
}
