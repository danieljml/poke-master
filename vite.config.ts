import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		base: 'https://danieljml.github.io/poke-master/',
		resolve: {
			alias: {
				util: 'rollup-plugin-node-polyfills/polyfills/util'	
			}
		},
		server: {
			port: process.env.VITE_APPLICATION_PORT,
		},
		plugins: [react()],
		optimizeDeps: {
			esbuildOptions: {
				plugins: [
					NodeGlobalsPolyfillPlugin({
							process: true,
							buffer: true
					}),
					NodeModulesPolyfillPlugin()
				]
			}
		}
	});
}
