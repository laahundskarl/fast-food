import z from 'zod';

export const paymentQueryValidator = z.object({
    name: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    productId: z.string().uuid().optional(),
});

export const paymentResponseSchema = z.object({
    id: z.string().uuid(),
    status: z.string(),
    externalReference: z.string().nullable(),
    qrCode: z.string().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    orders: z
        .object({
            id: z.string().uuid().optional(),
            value: z.number(),
            orderNumber: z.number(),
            status: z.string(),
            clientId: z.string().uuid(),
        })
        .optional(),
});
