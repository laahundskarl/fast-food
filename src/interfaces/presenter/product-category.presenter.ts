import { IProductCategory } from '#/domain/entities/product-category.entity';
import { ProductPresenter } from '#/interfaces/presenter/product.presenter';

export type ProductCategoryPresenterOutput = {
    id: string;
    name: string;
};

export type ProductCategoryWithProductsPresenterOutput = ProductCategoryPresenterOutput & {
    products: Array<{
        id: string;
        name: string;
        value: number;
        description: string | null;
    }>;
};

export class ProductCategoryPresenter {
    static createProductCategoryPresenter(category: IProductCategory): ProductCategoryPresenterOutput {
        return {
            id: category.id,
            name: category.name,
        };
    }

    static findProductCategoriesPresenter(categories: IProductCategory[]): ProductCategoryPresenterOutput[] {
        return categories.map(category => this.createProductCategoryPresenter(category));
    }

    static getProductCategoryPresenter(category: IProductCategory): ProductCategoryWithProductsPresenterOutput {
        const basePresentation = this.createProductCategoryPresenter(category);

        return {
            ...basePresentation,
            products: ProductPresenter.findProductsPresenter(category.products || []),
        };
    }
}
