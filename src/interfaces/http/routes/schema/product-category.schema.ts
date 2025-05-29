import z from 'zod';

export const productCategoryListSchema = {
    schema: z.object({
        query: z.object({
            name: z.string().optional(),
        }),
    }),
};
