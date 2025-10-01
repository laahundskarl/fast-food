import {
    deleteResponseSchema,
    errorConflictSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/interfaces/http/docs/util.docs';
import { validatorCreateClient, validatorParams, validatorUpdateClient } from '#/interfaces/http/schema/client.schema';

export const clientCreateSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Registrar cliente',
        body: validatorCreateClient,
        response: {
            201: {
                $ref: 'ClientResponseDTO#',
            },
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
            200: {
                $ref: 'ClientResponseDTO#',
            },
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
            200: {
                $ref: 'ClientResponseDTO#',
            },
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
            200: {
                $ref: 'ClientResponseDTO#',
            },
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
