import z from 'zod';

export const productResponseSchema = z.object({
    name: z.string(),
    value: z.number(),
    description: z.string(),
    categoryId: z.string().uuid(),
});
