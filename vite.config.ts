/// vite.config.ts
import { defineConfig } from 'vitest/config'; // ✅ use this, not 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.tsx', // or .js if you're using JS
    include: ['src/__tests__/**/*.test.{ts,tsx}'], // update path if needed
  },
});
