import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'], // 🔑 isso aqui é essencial
    target: 'node22',
    splitting: false,
    sourcemap: true,
    clean: true,
});
