import { env } from '#/config/env';
import { AppDataSource } from '#/database/typeorm.config';
import { buildApp } from '#/interfaces/http/app';

export async function startServer() {
    const app = buildApp();

    try {
        await AppDataSource.initialize();

        await app.listen({ port: env.PORT });
        console.log('HTTP server running!');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
