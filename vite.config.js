import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    hmr: {
      clientPort: 443,
      host: 'localhost',
    },
    // Cấu hình để cho phép tất cả các host kết nối
    cors: true,
    // Cho phép tất cả các host truy cập ứng dụng
    strictPort: true,
    allowedHosts: [
      'localhost', 
      '.replit.dev', 
      '.repl.co', 
      '.replit.app', 
      '*.worf.replit.dev',
      'e2f51a3f-ab30-4cda-bee0-3183a8711456-00-bk2hc9l51ooi.worf.replit.dev'
    ],
    watch: {
      usePolling: true
    }
  }
});