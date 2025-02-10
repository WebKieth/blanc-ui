import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import alias from '@rollup/plugin-alias'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		cssCodeSplit: true,
		target: 'esnext',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'blanc-ui',
			fileName: (format) => `blanc-ui.${format}.js`,
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'react',
				},
			},
		},
		outDir: './dist/react',
		emptyOutDir: true
	},
	plugins: [
		react(),
		vanillaExtractPlugin(),
		dts({ rollupTypes: true }),
		alias({
			entries: [{
				find: '@shared',
				replacement: resolve(__dirname, '..', 'shared')
			}]
		})
	],
})
