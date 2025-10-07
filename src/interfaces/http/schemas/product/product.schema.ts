import z from 'zod';

export const productCreateValidator = z.object({
    name: z.string(),
    description: z.string().optional(),
    value: z.number(),
    categoryId: z.string().uuid(),
});

export const productUpdateValidator = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    value: z.number().optional(),
    categoryId: z.string().uuid().optional(),
});

export const productResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    value: z.number(),
    description: z.string().nullable(),
    category: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .optional(),
});
