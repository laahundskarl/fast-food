import z from 'zod';

export const productListSchema = {
    schema: z.object({
        query: z.object({
            name: z.string().optional(),
            categoryId: z.string().optional(),
            productId: z.string().optional(),
        }),
    }),
};

export const productCreateSchema = {
    schema: z.object({
        name: z.string(),
        description: z.string().optional(),
        value: z.number(),
        categoryId: z.string(),
    }),
};

export const productUpdateSchema = {
    schema: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        value: z.number().optional(),
        categoryId: z.string().optional(),
        params: z.object({
            id: z.string().uuid(),
        }),
    }),
};

export const productDeleteSchema = {
    schema: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
};
