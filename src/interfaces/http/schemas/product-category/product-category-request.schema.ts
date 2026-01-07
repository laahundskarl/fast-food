import z from 'zod';

export const productCategoryParamsRequestSchema = z.object({
    id: z.string().uuid(),
});

export const productCategoryGetQueryRequestSchema = z.object({
    include: z
        .string()
        .optional()
        .transform(val => (val ? val.split(',').map(v => v.trim()) : []))
        .refine(val => !val || val.every(v => ['products'].includes(v)), {
            message: 'Invalid include values. Allowed: products',
        }),
});

export const productCategoryListQueryRequestSchema = z.object({
    name: z.string().optional(),
});

export type ProductCategoryParamsRequest = z.infer<typeof productCategoryParamsRequestSchema>;
export type ProductCategoryGetQueryRequest = z.infer<typeof productCategoryGetQueryRequestSchema>;
export type ProductCategoryListQueryRequest = z.infer<typeof productCategoryListQueryRequestSchema>;
