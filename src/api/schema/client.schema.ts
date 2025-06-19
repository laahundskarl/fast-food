import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

import { orderResponseSchema } from '#/api/schema/order.schema';

const messages = {
    cpf_required: 'CPF is required',
    cpf_invalid: 'Invalid CPF',
    name_required: 'Name is required',
    email_required: 'Email is required',
    email_invalid: 'Invalid email format',
};

export const createClientSchema = z.object({
    cpf: z
        .string({ required_error: messages.cpf_required })
        .refine(value => cpf.isValid(value), { message: messages.cpf_invalid }),
    name: z.string({ required_error: messages.name_required }),
    email: z.string({ required_error: messages.email_required }).email({ message: messages.email_invalid }),
});

export const validatorUpdateClient = z.object({
    cpf: z
        .string()
        .refine(value => cpf.isValid(value), { message: messages.cpf_invalid })
        .optional(),
    name: z.string().optional(),
    email: z.string().email({ message: messages.email_invalid }).optional(),
});

export const validatorParams = z.object({
    cpf: z.string({ required_error: messages.cpf_required }),
});

export const clientResponseSchema = z.object({
    id: z.string().uuid().describe('Identificador único do cliente'),
    name: z.string().describe('Nome do cliente'),
    cpf: z.string().length(11).describe('CPF do cliente'),
    email: z.string().email().describe('Email do cliente'),
});

export const clientWithOrderResponseSchema = clientResponseSchema.extend({
    orders: z.array(orderResponseSchema),
});
