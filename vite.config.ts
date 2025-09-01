import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), 'VITE_');
console.log('mode:', mode);
console.log('env:', env);
    console.log('Loaded VITE_BASE_PATH:', env.VITE_BASE_PATH) // debug

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/', // Set the base path dynamically from the environment variable
  }
})
