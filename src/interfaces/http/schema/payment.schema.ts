import z from 'zod';

export const paymentResponseSchema = z.object({
    id: z.string().uuid(),
    status: z.string(),
    externalReference: z.string().nullable(),
    qrCode: z.string().nullable(),
});
