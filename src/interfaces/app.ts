import fastifyCors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { errorHandler } from '#/interfaces/errors/error-handler';
import { registerSwagger } from '#/interfaces/http/docs';
import { registerRoutes } from '#/interfaces/http/routes';

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
