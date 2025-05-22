import { FastifyInstance } from 'fastify';

import { orderRoute } from '#/interfaces/http/routes/order.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(orderRoute, { prefix: '/order' });
}
