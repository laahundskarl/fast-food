import { FastifyInstance } from 'fastify';

import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IClientController } from '#/interfaces/controller/types/client';
import {
    clientCreateSchema,
    clientGetSchema,
    clientUpdateSchema,
    clientDeleteSchema,
} from '#/interfaces/http/schemas/client/client.route-schema';

export const clientRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IClientController>(TYPES.ClientController);

    app.post('/', clientCreateSchema, async (req, reply) => {
        const body = req.body as CreateClientDto;
        const response = await controller.create(body);
        return reply.status(201).send(response);
    });

    app.delete('/:cpf', clientDeleteSchema, async (req, reply) => {
        const cpf = (req.params as { cpf: string }).cpf;
        await controller.delete(cpf);
        return reply.send({ message: 'Client deleted successfully' });
    });

    app.get('/:cpf', clientGetSchema, async (req, reply) => {
        const cpf = (req.params as { cpf: string }).cpf;
        const include = (req.query as { include?: string }).include;

        const includes = include ? include.split(',') : [];
        const response = await controller.get(cpf, includes);
        return reply.send(response);
    });

    app.patch('/:cpf', clientUpdateSchema, async (req, reply) => {
        const cpf = (req.params as { cpf: string }).cpf;
        const body = req.body as UpdateClientDto;
        const response = await controller.update(cpf, body);
        return reply.send(response);
    });
};
