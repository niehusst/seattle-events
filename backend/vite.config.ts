import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Disable Vite's dev server for backend
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/server.ts'),
      name: 'SeattleEventsServer',
      formats: ['cjs'] // CommonJS format for Node.js
    },
    rollupOptions: {
      external: [
        // Externalize dependencies that should not be bundled
        'fs',
        'path',
        'os',
        'crypto',
        'stream',
        'util',
        'events',
        'net',
        'tls',
        'http',
        'https',
        'zlib',
        'buffer',
        'querystring',
        'url',
        'child_process',
        'cluster',
        'dgram',
        'dns',
        'domain',
        'readline',
        'repl',
        'string_decoder',
        'sys',
        'timers',
        'tty',
        'vm',
        'worker_threads',
        'process',
        'console',
        'assert',
        'tty',
        // Externalize project dependencies
        '@apollo/server',
        '@prisma/client',
        'cheerio',
        'cors',
        'express',
        'graphql',
        'helmet',
        'node-cron',
        'puppeteer',
        'winston'
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  resolve: {
    // Configuration for resolving modules
  },
  optimizeDeps: {
    // Configuration for dependency optimization
  }
});
