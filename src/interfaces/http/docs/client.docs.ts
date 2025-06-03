import z from 'zod';

import {
    errorConflictSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/interfaces/http/docs/error.docs';
import {
    clientResponseSchema,
    clientWithOrderResponseSchema,
    createClientSchema,
    validatorParams,
    validatorUpdateClient,
} from '#/interfaces/http/schema/client.schema';

export const clientCreateDocs = {
    schema: {
        tags: ['Clientes'],
        summary: 'Registrar cliente',
        body: createClientSchema,
        response: {
            201: clientResponseSchema,
            400: errorResponseValidationSchema,
            409: errorConflictSchema,
        },
    },
};

export const clientGetSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Buscar cliente',
        params: validatorParams,
        response: {
            200: clientResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const clientGetWithOrdersSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Busca cliente e seus pedidos',
        params: validatorParams,
        response: {
            200: clientWithOrderResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const clientUpdateSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Atualizar cliente',
        body: validatorUpdateClient,
        response: {
            200: clientResponseSchema,
            400: errorResponseValidationSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const clientDeleteSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Deletar cliente',
        params: validatorParams,
        response: {
            200: z.object({
                message: z.string(),
            }),
            404: errorNotFoundSchema,
            400: errorResponseValidationSchema,
        },
    },
};
