import z from 'zod';

import {
    deleteResponseSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/interfaces/http/docs/util.docs';
import { productResponseSchema } from '#/interfaces/http/schema/product.schema';

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
            201: productResponseSchema,
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
            200: productResponseSchema,
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
            200: z.array(productResponseSchema),
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
            200: productResponseSchema,
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
