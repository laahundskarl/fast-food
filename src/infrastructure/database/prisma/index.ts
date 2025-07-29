import { PrismaClient } from '@prisma/client';

export { PrismaClient };

export const prismaConfig = {
    log:
        process.env.NODE_ENV === 'development'
            ? (['query', 'info', 'warn', 'error'] as const)
            : (['warn', 'error'] as const),
    errorFormat: 'pretty' as const,
};
