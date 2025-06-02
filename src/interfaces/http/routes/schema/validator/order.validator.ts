import z from 'zod';

const messages = {
    client_required: 'ClientId is required',
    product_required: 'ProductId is required',
    quantity_required: 'Quantity is required',
    quantity_zero: 'The quantity must be greater than zero',
    minimum_products: 'At least one item is required in the order',
};

export const validatorCreateOrder = z.object({
    clientId: z.string({ required_error: messages.client_required }),
    orderProducts: z
        .array(
            z.object({
                productId: z.string({ required_error: messages.product_required }),
                quantity: z.number({ message: messages.quantity_required }).gt(0, { message: messages.quantity_zero }),
            }),
        )
        .min(1, { message: messages.minimum_products }),
});

export const validatorUpdateOrder = z.object({
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
