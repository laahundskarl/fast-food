import z from 'zod';

import { badRequestSchema, notFoundSchema } from '#/interfaces/http/schemas/common/error.schema';
import { deleteResponseSchema } from '#/interfaces/http/schemas/common/util.schema';
import {
    productCreateRequestSchema,
    productFindManyRequestSchema,
    productParamsRequestSchema,
    productQueryRequestSchema,
    productUpdateRequestSchema,
} from '#/interfaces/http/schemas/product/product-request.schema';
import { productResponseSchema } from '#/interfaces/http/schemas/product/product-response.schema';

export const productCreateSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Cria produto',
        body: productCreateRequestSchema,
        response: {
            201: productResponseSchema,
            400: badRequestSchema,
        },
    },
};

export const productGetSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Busca produto',
        params: productParamsRequestSchema,
        response: {
            200: productResponseSchema,
            404: notFoundSchema,
        },
    },
};

export const productListSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Lista produto',
        query: productQueryRequestSchema,
        response: {
            200: z.array(productResponseSchema),
        },
    },
};

export const productUpdateSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Atualiza produto',
        body: productUpdateRequestSchema,
        params: productParamsRequestSchema,
        response: {
            200: productResponseSchema,
            404: notFoundSchema,
            400: badRequestSchema,
        },
    },
};

export const productDeleteSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Deleta produto',
        params: productParamsRequestSchema,
        response: {
            200: deleteResponseSchema,
            404: notFoundSchema,
        },
    },
};

export const productFindManySchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Busca múltiplos produtos por IDs',
        body: productFindManyRequestSchema,
        response: {
            200: z.array(productResponseSchema),
            400: badRequestSchema,
        },
    },
};
