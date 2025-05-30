import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

export const validatorIdentify = z.object({
    cpf: z
        .string({ required_error: 'CPF é obrigatório' })
        .refine(value => cpf.isValid(value), { message: 'CPF inválido' }),
});
