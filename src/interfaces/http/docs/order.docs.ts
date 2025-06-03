import z from 'zod';

import { validatorCreateOrder, validatorUpdateOrder } from '#/interfaces/http/schema/order.schema';

export const orderCreateSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Cria pedido',
        body: validatorCreateOrder,
    },
};

export const orderGetSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Busca pedido',
        params: z.object({
            id: z.string(),
        }),
    },
};

export const orderListSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Lista pedidos',
        query: z.object({
            orderId: z.string(),
        }),
    },
};

export const orderUpdateSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Atualiza pedido',
        body: validatorUpdateOrder,
    },
};

export const orderDeleteSchema = {
    schema: {
        tags: ['Pedidos'],
        summary: 'Deleta pedido',
        params: z.object({
            id: z.string().uuid(),
        }),
    },
};
