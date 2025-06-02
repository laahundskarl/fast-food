import z from 'zod';

import { validatorCreateOrder, validatorUpdateOrder } from '#/interfaces/http/routes/schema/validator/order.validator';

export const orderCreateSchema = {
    summary: 'Create Order',
    tags: ['order'],
    schema: {
        body: validatorCreateOrder,
    },
};

export const orderGetSchema = {
    summary: 'Get Order',
    tags: ['order'],
    schema: {
        params: z.object({
            id: z.string(),
        }),
    },
};

export const orderListSchema = {
    summary: 'List Order',
    tags: ['order'],
    schema: z.object({
        orderId: z.string(),
    }),
};

export const orderUpdateSchema = {
    summary: 'Update Order',
    tags: ['order'],
    schema: {
        body: validatorUpdateOrder,
    },
};

export const orderDeleteSchema = {
    summary: 'Delete Order',
    tags: ['order'],
    schema: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
};
