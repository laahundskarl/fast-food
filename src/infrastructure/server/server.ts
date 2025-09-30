import { container } from '#/infrastructure/config/di/container';
import { env } from '#/infrastructure/config/env';
import { logger } from '#/infrastructure/config/logger';
import { buildApp } from '#/infrastructure/server/app';

export async function startServer() {
    const app = buildApp(container);

    try {
        await app.listen({ port: env.PORT, host: '0.0.0.0' });
        logger.info('HTTP server running!');
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}
