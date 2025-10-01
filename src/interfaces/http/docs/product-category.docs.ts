import { z } from 'zod';

import { errorNotFoundSchema, errorResponseValidationSchema } from '#/interfaces/http/docs/util.docs';

export const productCategoryGetSchema = {
    schema: {
        summary: 'Busca uma categoria de produtos',
        tags: ['Categoria'],
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: {
                $ref: 'ProductCategoryResponseDTO#',
            },
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
            200: {
                type: 'array',
                items: { $ref: 'ProductCategoryResponseDTO#' },
            },
        },
    },
};
