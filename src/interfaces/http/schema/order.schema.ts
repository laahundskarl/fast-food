import z from 'zod';

import { paymentResponseSchema } from '#/interfaces/http/schema/payment.schema';
import { productResponseSchema } from '#/interfaces/http/schema/product.schema';

const messages = {
    product_required: 'ProductId is required',
    quantity_required: 'Quantity is required',
    quantity_zero: 'The quantity must be greater than zero',
    minimum_products: 'At least one item is required in the order',
};

export const validatorCreateOrder = z.object({
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

export const orderProductSchema = z.object({
    id: z.string().uuid(),
    amount: z.number(),
    value: z.number(),
    product: productResponseSchema,
});

export const orderResponseSchema = z.object({
    id: z.string().uuid().optional(),
    value: z.number(),
    orderNumber: z.number(),
    status: z.string(),
    orderProducts: z.array(orderProductSchema),
    payments: z.array(paymentResponseSchema),
    client: z
        .object({
            id: z.string().uuid(),
            name: z.string(),
            cpf: z.string().length(11),
            email: z.string().email(),
        })
        .optional(),
});
