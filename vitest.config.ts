import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/**/*.{ts,tsx}'],
      exclude: ['app/layout.tsx', 'app/globals.css', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'next/link':       path.resolve(__dirname, './__mocks__/next-link.tsx'),
      'next/navigation': path.resolve(__dirname, './__mocks__/next-navigation.ts'),
      'next/image':      path.resolve(__dirname, './__mocks__/next-image.tsx'),
    },
  },
})
