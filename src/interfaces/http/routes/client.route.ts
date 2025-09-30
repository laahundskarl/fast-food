import { FastifyInstance } from 'fastify';

import { CreateClientDto } from '#/application/use-cases/client/create-client/create-client.dto';
import { UpdateClientDto } from '#/application/use-cases/client/update-client/update-client.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IClientController } from '#/interfaces/controller/types/client';
import {
    clientCreateDocs,
    clientGetSchema,
    clientGetWithOrdersSchema,
    clientUpdateSchema,
    clientDeleteSchema,
} from '#/interfaces/http/docs/client.docs';

export const clientRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IClientController>(TYPES.ClientController);

    app.post('/', clientCreateDocs, async (req, reply) => {
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
        const response = await controller.get(cpf);
        return reply.send(response);
    });

    app.get('/orders/:cpf', clientGetWithOrdersSchema, async (req, reply) => {
        const cpf = (req.params as { cpf: string }).cpf;
        const response = await controller.getOrders(cpf);
        return reply.send(response);
    });

    app.patch('/:cpf', clientUpdateSchema, async (req, reply) => {
        const cpf = (req.params as { cpf: string }).cpf;
        const body = req.body as UpdateClientDto;
        const response = await controller.update(cpf, body);
        return reply.send(response);
    });
};
