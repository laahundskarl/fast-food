import { Product, ProductCategory } from '@prisma/client';

export type ProductCategoryWithProducts = ProductCategory & {
    products: Product[];
};
