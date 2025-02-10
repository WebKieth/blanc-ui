import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		cssCodeSplit: true,
		target: 'esnext',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'blank-ui',
			fileName: (format) => `blank-ui.${format}.js`,
		},
		outDir: './dist/react',
		emptyOutDir: true
	},
	plugins: [
		react(),
		vanillaExtractPlugin(),
		alias({
			entries: [{
				find: '@shared',
				replacement: resolve(__dirname, '..', 'shared')
			}]
		})
	],
})
