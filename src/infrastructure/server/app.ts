import fastifyCors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { Container } from 'inversify';

import { registerSwagger } from '#/interfaces/http/docs';
import { errorHandler } from '#/interfaces/http/middlewares/error-handler';
import { registerRoutes } from '#/interfaces/http/routes';

export function buildApp(container: Container): FastifyInstance {
    const app = fastify({ logger: true });

    app.decorate('container', container);

    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);

    app.register(fastifyCors);

    registerSwagger(app);
    registerRoutes(app);

    app.setErrorHandler(errorHandler);

    return app;
}
