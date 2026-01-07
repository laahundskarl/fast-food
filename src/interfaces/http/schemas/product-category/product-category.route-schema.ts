import { z } from 'zod';

import { badRequestSchema, notFoundSchema } from '#/interfaces/http/schemas//common/error.schema';
import {
    productCategoryParamsRequestSchema,
    productCategoryListQueryRequestSchema,
    productCategoryGetQueryRequestSchema,
} from '#/interfaces/http/schemas/product-category/product-category-request.schema';
import { productCategoryResponseSchema } from '#/interfaces/http/schemas/product-category/product-category-response.schema';

export const productCategoryGetSchema = {
    schema: {
        summary: 'Busca uma categoria de produtos',
        tags: ['Categoria'],
        params: productCategoryParamsRequestSchema,
        query: productCategoryGetQueryRequestSchema,
        response: {
            200: productCategoryResponseSchema,
            404: notFoundSchema,
            400: badRequestSchema,
        },
    },
};

export const productCategoryListSchema = {
    schema: {
        summary: 'Lista e filtra as categorias de produtos',
        tags: ['Categoria'],
        query: productCategoryListQueryRequestSchema,
        response: {
            200: z.array(productCategoryResponseSchema),
            400: badRequestSchema,
        },
    },
};
