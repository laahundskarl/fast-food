import z from 'zod';

import { orderResponseSchema, validatorCreateOrder, validatorUpdateOrder } from '#/api/schema/order.schema';
import { deleteResponseSchema, errorNotFoundSchema, errorResponseValidationSchema } from '#/docs/util.docs';

export const orderCreateSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Cria pedido',
        body: validatorCreateOrder,
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
        query: z.object({
            status: z.string().optional(),
            clientId: z.string().optional(),
            productId: z.string().optional(),
            paymentStatus: z.string().optional(),
        }),
        response: {
            200: z.array(orderResponseSchema),
        },
    },
};

export const orderUpdateSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Atualiza pedido',
        body: validatorUpdateOrder,
        response: {
            200: orderResponseSchema,
            400: errorResponseValidationSchema,
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
