import z from 'zod';

export const productResponseSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    value: z.number(),
    description: z.string(),
    categoryId: z.string().optional(),
    category: z
        .object({
            id: z.string().uuid(),
            name: z.string(),
        })
        .optional(),
});
