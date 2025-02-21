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
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/index.ts'),
			fileName: (format) => `blanc-ui.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDom',
					'react/jsx-runtime': 'ReactJsxRuntime'
				},
			},
		},
		outDir: './dist/react',
		emptyOutDir: true
	},
	plugins: [
		react(),
		vanillaExtractPlugin(),
		dts({
			rollupTypes: true,
			tsconfigPath: resolve(__dirname, "tsconfig.json")
		}),
		alias({
			entries: [{
				find: '@shared',
				replacement: resolve(__dirname, '..', 'shared')
			}]
		})
	],
})
