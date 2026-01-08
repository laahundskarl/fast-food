import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { Container } from 'inversify';

import { errorHandler } from '#/interfaces/http/middlewares/error-handler.middleware';
import { registerRoutes } from '#/interfaces/http/routes';

export function buildApp(container: Container): FastifyInstance {
    const app = fastify({ logger: true });

    app.decorate('container', container);

    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);

    app.register(fastifyCors);

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'API FastFood',
                description: 'Documentação da API FastFood',
                version: '1.0.0',
            },
            tags: [
                {
                    name: 'Clientes',
                    description: 'Operações relacionadas a clientes',
                },
                {
                    name: 'Categoria',
                    description: 'Operações relacionadas a categoria',
                },
                {
                    name: 'Produtos',
                    description: 'Operações relacionadas a produtos',
                },
            ],
        },
        transform: jsonSchemaTransform,
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
    });

    registerRoutes(app);

    app.setErrorHandler(errorHandler);

    return app;
}
