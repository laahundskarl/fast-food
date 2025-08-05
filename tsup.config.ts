import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/infrastructure/database/prisma/seeds/seed.ts'], // ou main.ts
    outDir: 'dist',
    target: 'es2020',
    format: ['cjs'],
    splitting: false,
    clean: true,
});
