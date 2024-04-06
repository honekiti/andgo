import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import reactNative from 'vitest-react-native';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./setup-files-after-env.ts'],
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './junit.xml',
    },
    coverage: {
      provider: 'v8',
      exclude: [],
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        statements: 80,
        branches: 60,
        functions: 0,
        lines: 0,
      },
    },
  },
  plugins: [reactNative(), react()],
});
