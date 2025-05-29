import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

export const validatorClient = z.object({
    cpf: z
        .string({ required_error: 'CPF é obrigatório' })
        .refine(value => cpf.isValid(value), { message: 'CPF inválido' }),
    name: z.string({ required_error: 'Nome é obrigatório' }),
    email: z.string({ required_error: 'E-mail é obrigatório' }).email({ message: 'Formato de e-mail é inválido' }),
});
