import z from 'zod';

export const productCreateRequestSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    value: z.number(),
    categoryId: z.string().uuid(),
});

export const productUpdateRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    value: z.number().optional(),
    categoryId: z.string().uuid().optional(),
});

export const productParamsRequestSchema = z.object({
    id: z.string().uuid(),
});

export const productQueryRequestSchema = z.object({
    name: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    productId: z.string().uuid().optional(),
});

export type ProductCreateRequest = z.infer<typeof productCreateRequestSchema>;
export type ProductUpdateRequest = z.infer<typeof productUpdateRequestSchema>;
export type ProductParamsRequest = z.infer<typeof productParamsRequestSchema>;
export type ProductQueryRequest = z.infer<typeof productQueryRequestSchema>;
