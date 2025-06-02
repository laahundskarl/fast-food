import { cpf } from 'cpf-cnpj-validator';
import z from 'zod';

export const validatorIdentify = z.object({
    cpf: z
        .string({ required_error: 'CPF is required' })
        .refine(value => cpf.isValid(value), { message: 'Invalid CPF' }),
});
