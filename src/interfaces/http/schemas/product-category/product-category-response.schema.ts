import z from 'zod';

export const productCategoryResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    products: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                value: z.number(),
                description: z.string().nullable(),
            }),
        )
        .optional(),
});

export type ProductCategoryResponseSchema = z.infer<typeof productCategoryResponseSchema>;
