import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify, { FastifyInstance } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { errorHandler } from '#/interfaces/errors/error-handler';
import { registerRoutes } from '#/interfaces/http/routes';

export function buildApp(): FastifyInstance {
    const app = fastify({ logger: true });

    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);

    app.register(fastifyCors);

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'fast-food',
                version: '0.0.1',
            },
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
