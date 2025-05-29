import z from 'zod';

export const orderListSchema = {
    schema: z.object({
        orderId: z.string(),
    }),
};

export const orderGetSchema = {
    schema: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
};

export const orderCreateSchema = {
    schema: z.object({
        clientId: z.string(),
        value: z.number(),
        orderNumber: z.number(),
        orderProducts: z.array(
            z.object({
                productId: z.string(),
                amount: z.number(),
                value: z.number(),
            }),
        ),
    }),
};

export const orderUpdateSchema = {
    schema: z.object({
        id: z.string(),
        clientId: z.string(),
        value: z.number(),
        orderNumber: z.number(),
        orderProducts: z.array(
            z.object({
                productId: z.string(),
                amount: z.number(),
                value: z.number(),
            }),
        ),
    }),
};

export const orderDeleteSchema = {
    schema: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
};
