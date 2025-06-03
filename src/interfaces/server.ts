import { env } from '#/config/env';
import { buildApp } from '#/interfaces/app';

export async function startServer() {
    const app = buildApp();

    try {
        await app.listen({ port: env.PORT, host: '0.0.0.0' });
        console.log('HTTP server running!');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
