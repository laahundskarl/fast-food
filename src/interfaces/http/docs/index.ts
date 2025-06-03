import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export function registerSwagger(app: FastifyInstance) {
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
                    name: 'Identificação',
                    description: 'Operações relacionada a identificação do cliente',
                },
                {
                    name: 'Pedidos',
                    description: 'Operações relacionadas a pedidos',
                },
                {
                    name: 'Pagamentos',
                    description: 'Operações relacionadas a pagamentos',
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
}
