import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

export const validatorCreateClient = z.object({
    cpf: z
        .string({ required_error: 'CPF é obrigatório' })
        .refine(value => cpf.isValid(value), { message: 'CPF inválido' }),
    name: z.string({ required_error: 'Nome é obrigatório' }),
    email: z.string({ required_error: 'E-mail é obrigatório' }).email({ message: 'Formato de e-mail é inválido' }),
});

export const validatorUpdateClient = z.object({
    cpf: z
        .string({ required_error: 'CPF é obrigatório' })
        .refine(value => cpf.isValid(value), { message: 'CPF inválido' })
        .optional(),
    name: z.string({ required_error: 'Nome é obrigatório' }).optional(),
    email: z
        .string({ required_error: 'E-mail é obrigatório' })
        .email({ message: 'Formato de e-mail é inválido' })
        .optional(),
});
