import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

const messages = {
    cpf_required: 'CPF is required',
    cpf_invalid: 'Invalid CPF',
    name_required: 'Name is required',
    email_required: 'Email is required',
    email_invalid: 'Invalid email format',
};

export const validatorCreateClient = z.object({
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
