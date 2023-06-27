import { loadEnv } from 'vite'

process.env = { ...process.env, ...loadEnv('local', process.cwd()) };

const port = process.env.VITE_APPLICATION_PORT

export default defineConfig({
  e2e: {
    baseUrl: `localhost:${port}`,
  },
})
