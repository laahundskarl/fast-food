import { IProduct } from '#/domain/entities/product.entity';

export type ProductPresenterOutput = {
    id: string;
    name: string;
    value: number;
    description: string | null;
    categoryId: string;
};

export type ProductWithCategoryPresenterOutput = ProductPresenterOutput & {
    category: {
        id: string;
        name: string;
    };
};

export class ProductPresenter {
    static createProductPresenter(product: IProduct): ProductPresenterOutput {
        return {
            id: product.id,
            name: product.name,
            value: product.value,
            description: product.description,
            categoryId: product.category.id,
        };
    }

    static findProductsPresenter(products: IProduct[]): ProductPresenterOutput[] {
        return products.map(product => this.createProductPresenter(product));
    }

    static getProductPresenter(product: IProduct): ProductPresenterOutput | ProductWithCategoryPresenterOutput {
        const basePresentation = this.createProductPresenter(product);

        if (product.category) {
            return {
                ...basePresentation,
                category: {
                    id: product.category.id,
                    name: product.category.name,
                },
            };
        }

        return basePresentation;
    }
}
