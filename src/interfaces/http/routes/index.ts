import { FastifyInstance } from 'fastify';

import { clientRoute } from '#/interfaces/http/routes/client.route';
import { orderRoute } from '#/interfaces/http/routes/order.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(clientRoute, { prefix: '/client' });
    app.register(orderRoute, { prefix: '/order' });
}
