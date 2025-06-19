import {
    clientResponseSchema,
    clientWithOrderResponseSchema,
    createClientSchema,
    validatorParams,
    validatorUpdateClient,
} from '#/api/schema/client.schema';
import {
    deleteResponseSchema,
    errorConflictSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/docs/util.docs';

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
            200: deleteResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};
