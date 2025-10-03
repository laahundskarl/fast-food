import z from 'zod';

import {
    orderCreateValidator,
    orderParamsValidator,
    orderQueryValidator,
    orderResponseSchema,
    orderUpdateStatusValidator,
    orderUpdateValidator,
} from '#/interfaces/http/schemas/order/order.schema';
import {
    deleteResponseSchema,
    errorBusinessSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/interfaces/http/schemas/until.schema';

export const orderCreateSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Cria pedido',
        body: orderCreateValidator,
        response: {
            200: orderResponseSchema,
            400: errorResponseValidationSchema,
        },
    },
};

export const orderGetSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Busca pedido',
        params: z.object({
            id: z.string(),
        }),
        response: {
            200: orderResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const orderListSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Lista pedidos',
        query: orderQueryValidator,
        response: {
            200: z.array(orderResponseSchema),
        },
    },
};

export const orderUpdateSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Atualiza pedido',
        body: orderUpdateValidator,
        response: {
            200: orderResponseSchema,
            400: errorResponseValidationSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const orderUpdateStatusSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Atualiza status do pedido',
        params: orderParamsValidator,
        body: orderUpdateStatusValidator,
        response: {
            200: orderResponseSchema,
            400: errorBusinessSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const orderDeleteSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Deleta pedido',
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: deleteResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};
