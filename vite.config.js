import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: ['30392daf-6bfb-479a-a2db-6fd192303e7e-00-1dt3z29l56b5l.riker.replit.dev'],
  },
});
