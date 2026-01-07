import z from 'zod';

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

export type ProductResponse = z.infer<typeof productResponseSchema>;
