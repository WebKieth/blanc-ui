import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
		outDir: './dist/vue',
		emptyOutDir: true
	},
	plugins: [
		vue(),
		vueJsx(),
		vanillaExtractPlugin(),
		alias({
			entries: [{
				find: '@shared',
				replacement: resolve(__dirname, '..', 'shared')
			}]
		})
	],
})
