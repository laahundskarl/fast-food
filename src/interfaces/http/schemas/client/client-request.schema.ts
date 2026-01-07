import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

const messages = {
    cpf_required: 'CPF is required',
    cpf_invalid: 'Invalid CPF',
    name_required: 'Name is required',
    email_required: 'Email is required',
    email_invalid: 'Invalid email format',
};

export const clientCreateRequestSchema = z.object({
    cpf: z
        .string({ required_error: messages.cpf_required })
        .refine(value => cpf.isValid(value), { message: messages.cpf_invalid }),
    name: z.string({ required_error: messages.name_required }),
    email: z.string({ required_error: messages.email_required }).email({ message: messages.email_invalid }),
});

export const clientUpdateRequestSchema = z.object({
    cpf: z
        .string()
        .refine(value => cpf.isValid(value), { message: messages.cpf_invalid })
        .optional(),
    name: z.string().optional(),
    email: z.string().email({ message: messages.email_invalid }).optional(),
});

export const clientParamsRequestSchema = z.object({
    id: z.string().uuid().optional(),
    cpf: z.string({ required_error: messages.cpf_required }).optional(),
});

export type ClientCreateRequest = z.infer<typeof clientCreateRequestSchema>;
export type ClientUpdateRequest = z.infer<typeof clientUpdateRequestSchema>;
export type ClientParamsRequest = z.infer<typeof clientParamsRequestSchema>;
