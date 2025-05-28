import z from 'zod';

export const productListSchema = {
    schema: z.object({
        productId: z.string().optional(),
        name: z.string().optional(),
        categoryId: z.string().optional(),
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
