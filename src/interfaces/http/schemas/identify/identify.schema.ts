import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

export const identifyValidator = z.object({
    cpf: z
        .string({ required_error: 'CPF is required' })
        .refine(value => cpf.isValid(value), { message: 'Invalid CPF' }),
});

export const identifyResponseSchema = z.object({
    id: z.string().uuid().describe('Identificador único do cliente'),
    name: z.string().describe('Nome do cliente'),
    cpf: z.string().length(11).describe('CPF do cliente'),
    email: z.string().email().describe('Email do cliente'),
});
