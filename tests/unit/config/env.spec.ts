import { z } from 'zod';

const getParsedEnv = () => {
    const envSchema = z.object({
        NODE_ENV: z.enum(['dev', 'hml', 'prd', 'test']).default('dev'),
        PORT: z.coerce.number().default(3000),
        DATABASE_HOST: z.string(),
        DATABASE_PORT: z.coerce.number().default(3306),
        DATABASE_USER: z.string(),
        DATABASE_PASS: z.string(),
        DATABASE_NAME: z.string(),
    });

    return envSchema.parse(process.env);
};

describe('env schema', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV }; // Restaura ambiente original antes de cada teste
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it('should parse all environment variables defined in jest.setup.ts', () => {
        const parsed = getParsedEnv();

        expect(parsed).toEqual({
            NODE_ENV: 'test',
            PORT: 4000,
            DATABASE_HOST: 'localhost',
            DATABASE_PORT: 5432,
            DATABASE_USER: 'test_user',
            DATABASE_PASS: 'test_pass',
            DATABASE_NAME: 'test_db',
        });
    });

    it('should throw error if required env variables are missing', () => {
        delete process.env.DATABASE_USER;

        expect(() => getParsedEnv()).toThrow(z.ZodError);
    });

    it('should apply default values when optional env variables are missing', () => {
        delete process.env.NODE_ENV;
        delete process.env.PORT;
        delete process.env.DATABASE_PORT;

        const parsed = getParsedEnv();

        expect(parsed.NODE_ENV).toBe('dev');
        expect(parsed.PORT).toBe(3000);
        expect(parsed.DATABASE_PORT).toBe(3306);
    });
});
