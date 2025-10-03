import { z } from 'zod';

import { productCategoryResponseSchema } from '#/interfaces/http/schemas/product-category/product-category.schema';
import { errorNotFoundSchema, errorResponseValidationSchema } from '#/interfaces/http/schemas/until.schema';

export const productCategoryGetSchema = {
    schema: {
        summary: 'Busca uma categoria de produtos',
        tags: ['Categoria'],
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: productCategoryResponseSchema,
            404: errorNotFoundSchema,
            400: errorResponseValidationSchema,
        },
    },
};

export const productCategoryListSchema = {
    schema: {
        summary: 'Lista e filtra as categorias de produtos',
        tags: ['Categoria'],
        response: {
            200: z.array(productCategoryResponseSchema),
        },
    },
};
