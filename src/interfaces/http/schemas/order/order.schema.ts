import z from 'zod';

const messages = {
    product_required: 'ProductId is required',
    quantity_required: 'Quantity is required',
    quantity_zero: 'The quantity must be greater than zero',
    minimum_products: 'At least one item is required in the order',
};

export const orderCreateValidator = z.object({
    clientId: z.string().optional(),
    orderProducts: z
        .array(
            z.object({
                productId: z.string({ required_error: messages.product_required }),
                quantity: z.number({ message: messages.quantity_required }).gt(0, { message: messages.quantity_zero }),
            }),
        )
        .min(1, { message: messages.minimum_products }),
});

export const orderUpdateValidator = z.object({
    status: z.string().optional(),
    orderProducts: z
        .array(
            z.object({
                productId: z.string(),
                quantity: z.number().gt(0, { message: messages.quantity_zero }).optional(),
            }),
        )
        .min(1, { message: messages.minimum_products })
        .optional(),
});

export const orderQueryValidator = z.object({
    status: z.string().optional(),
    clientId: z.string().optional(),
    productId: z.string().optional(),
    paymentStatus: z.string().optional(),
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
});

export const orderUpdateStatusValidator = z.object({
    status: z.enum(['WAITING', 'RECEIVED', 'IN_PROGRESS', 'DONE', 'FINISHED', 'CANCELED']),
});

export const orderParamsValidator = z.object({
    id: z.string().uuid(),
});

export const orderResponseSchema = z.object({
    id: z.string().uuid().optional(),
    value: z.number(),
    orderNumber: z.number(),
    status: z.string(),
    orderProducts: z
        .array(
            z.object({
                id: z.string().uuid(),
                amount: z.number(),
                value: z.number(),
                product: z.object({
                    id: z.string(),
                    name: z.string(),
                    value: z.number(),
                    description: z.string().nullable(),
                    category: z.object({
                        id: z.string(),
                        name: z.string(),
                    }),
                }),
            }),
        )
        .optional(),
    payments: z
        .array(
            z.object({
                id: z.string().uuid(),
                status: z.string(),
                externalReference: z.string().nullable(),
                qrCode: z.string().nullable(),
                createdAt: z.date().optional(),
                updatedAt: z.date().optional(),
            }),
        )
        .optional(),
    client: z
        .object({
            id: z.string().uuid(),
            name: z.string(),
            cpf: z.string().length(11),
            email: z.string().email(),
        })
        .optional(),
});
