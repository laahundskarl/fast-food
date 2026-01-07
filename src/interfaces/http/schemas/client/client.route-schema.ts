import {
    clientCreateRequestSchema,
    clientParamsRequestSchema,
    clientUpdateRequestSchema,
} from '#/interfaces/http/schemas/client/client-request.schema';
import { clientResponseSchema } from '#/interfaces/http/schemas/client/client-response.schema';
import { badRequestSchema, conflictErrorSchema, notFoundSchema } from '#/interfaces/http/schemas/common/error.schema';
import { deleteResponseSchema } from '#/interfaces/http/schemas/common/util.schema';

export const clientCreateSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Registrar cliente',
        body: clientCreateRequestSchema,
        response: {
            201: clientResponseSchema,
            400: badRequestSchema,
            409: conflictErrorSchema,
        },
    },
};

export const clientGetSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Buscar cliente',
        params: clientParamsRequestSchema,
        response: {
            200: clientResponseSchema,
            404: notFoundSchema,
        },
    },
};

export const clientUpdateSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Atualizar cliente',
        body: clientUpdateRequestSchema,
        response: {
            200: clientResponseSchema,
            400: badRequestSchema,
            404: notFoundSchema,
        },
    },
};

export const clientDeleteSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Deletar cliente',
        params: clientParamsRequestSchema,
        response: {
            200: deleteResponseSchema,
            404: notFoundSchema,
        },
    },
};
