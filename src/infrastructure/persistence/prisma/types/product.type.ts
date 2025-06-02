import { Product, ProductCategory } from '@prisma/client';

export type ProductWithCategory = Product & {
    category: ProductCategory;
};
