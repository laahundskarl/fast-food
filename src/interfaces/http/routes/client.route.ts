import { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { TYPES } from '#/infrastructure/config/di/types';
import { ClientController } from '#/interfaces/controller/client.controller';
import {
    ClientCreateRequest,
    ClientParamsRequest,
    ClientUpdateRequest,
} from '#/interfaces/http/schemas/client/client-request.schema';
import {
    clientCreateSchema,
    clientGetSchema,
    clientUpdateSchema,
    clientDeleteSchema,
} from '#/interfaces/http/schemas/client/client.route-schema';

export const clientRoute = (app: FastifyInstance) => {
    const controller = app.container.get<ClientController>(TYPES.ClientController);

    app.post<{ Body: ClientCreateRequest }>('/', clientCreateSchema, async (req, reply) => {
        const response = await controller.create(req.body);
        return reply.status(StatusCodes.CREATED).send(response);
    });

    app.delete<{ Params: ClientParamsRequest }>('/:cpf', clientDeleteSchema, async (req, reply) => {
        const response = await controller.delete(req.params.cpf!);
        return reply.send(response);
    });

    app.get<{ Params: ClientParamsRequest }>('/:cpf/cpf', clientGetSchema, async (req, reply) => {
        const response = await controller.get(req.params.cpf!);
        return reply.send(response);
    });

    app.get<{ Params: ClientParamsRequest }>('/:id/id', clientGetSchema, async (req, reply) => {
        const response = await controller.getById(req.params.id!);
        return reply.send(response);
    });

    app.patch<{
        Params: ClientParamsRequest;
        Body: ClientUpdateRequest;
    }>('/:cpf', clientUpdateSchema, async (req, reply) => {
        const response = await controller.update(req.params.cpf!, req.body);
        return reply.send(response);
    });
};
