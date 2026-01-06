import path from 'path';
import { defineConfig } from 'vitest/config';

const resolveAliases = {
  '#': path.resolve(__dirname, 'src'),
}

export default defineConfig({
  resolve: {
    alias: resolveAliases,
  },
  test: {
    coverage: {
      thresholds: {
        statements: 90,
        functions: 90,
        branches: 40,
        lines: 90,
      },
      reportOnFailure: true,
    },
    globals: true,
    environment: 'node',
    root: './src',
    testTimeout: 10000,
  },
});