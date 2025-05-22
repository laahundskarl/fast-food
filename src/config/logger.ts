import pino from 'pino';

export const logger = pino({
    transport: {
        target: 'pino-pretty', // para deixar legível no terminal
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
        },
    },
    level: 'debug',
});
