import z from 'zod';

export const paymentResponseSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().optional(),
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
