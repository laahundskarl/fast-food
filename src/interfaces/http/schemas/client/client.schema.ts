import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

const messages = {
    cpf_required: 'CPF is required',
    cpf_invalid: 'Invalid CPF',
    name_required: 'Name is required',
    email_required: 'Email is required',
    email_invalid: 'Invalid email format',
};

export const clientCreateValidator = z.object({
    cpf: z
        .string({ required_error: messages.cpf_required })
        .refine(value => cpf.isValid(value), { message: messages.cpf_invalid }),
    name: z.string({ required_error: messages.name_required }),
    email: z.string({ required_error: messages.email_required }).email({ message: messages.email_invalid }),
});

export const clientUpdateValidator = z.object({
    cpf: z
        .string()
        .refine(value => cpf.isValid(value), { message: messages.cpf_invalid })
        .optional(),
    name: z.string().optional(),
    email: z.string().email({ message: messages.email_invalid }).optional(),
});

export const clientParamsValidator = z.object({
    cpf: z.string({ required_error: messages.cpf_required }),
});

export const clientResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    orders: z
        .array(
            z.object({
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
            }),
        )
        .optional(),
});
