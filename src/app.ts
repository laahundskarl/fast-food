import fastifyCors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { registerRoutes } from '#/api/routes';
import { registerSwagger } from '#/docs';
import { errorHandler } from '#/error-handler';

export function buildApp(): FastifyInstance {
    const app = fastify({ logger: true });

    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);

    app.register(fastifyCors);

    registerSwagger(app);
    registerRoutes(app);

    app.setErrorHandler(errorHandler);

    return app;
}
