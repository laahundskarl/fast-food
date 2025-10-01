import z from 'zod';

import {
    deleteResponseSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/interfaces/http/docs/util.docs';

export const productCreateSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Cria produto',
        body: z.object({
            name: z.string(),
            description: z.string().optional(),
            value: z.number(),
            categoryId: z.string().uuid(),
        }),
        response: {
            201: {
                $ref: 'ProductResponseDTO#',
            },
            400: errorResponseValidationSchema,
        },
    },
};

export const productGetSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Busca produto',
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: {
                $ref: 'ProductResponseDTO#',
            },
            404: errorNotFoundSchema,
        },
    },
};

export const productListSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Lista produto',
        query: z.object({
            name: z.string().optional(),
            categoryId: z.string().uuid().optional(),
            productId: z.string().uuid().optional(),
        }),
        response: {
            200: {
                type: 'array',
                items: {
                    $ref: 'ProductResponseDTO#',
                },
            },
        },
    },
};

export const productUpdateSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Atualiza produto',
        body: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            value: z.number().optional(),
            categoryId: z.string().uuid().optional(),
        }),
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: {
                $ref: 'ProductResponseDTO#',
            },
            404: errorNotFoundSchema,
            400: errorResponseValidationSchema,
        },
    },
};

export const productDeleteSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Deleta produto',
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: deleteResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};
