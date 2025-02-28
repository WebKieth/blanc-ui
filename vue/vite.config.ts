import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		cssCodeSplit: true,
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/index.ts'),
			fileName: (format) => `blanc-ui.${format}.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'vue',
				},
			},
		},
		outDir: './dist/vue',
		emptyOutDir: true
	},
	resolve: {
		alias: {
			'@shared': resolve(__dirname, '..', 'shared')
		}
	},
	plugins: [
		vue(),
		vueJsx(),
		vanillaExtractPlugin(),
		dts({
			rollupTypes: true,
			tsconfigPath: resolve(__dirname, "tsconfig.json")
		})
	],
})
