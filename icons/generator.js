import fs from 'fs'
import cheerio from 'cheerio'

const VUE_PATH = '../vue/src/components/icon'
// const REACT_PATH = '../react/src/components/icon'

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase())
const generate = () => {
	const componentNames = []
	const sprite = fs.readFileSync('./basic.sprite.svg', 'utf-8')
	const $ = cheerio.load(sprite)
	$('symbol').each((index, item) => {
		const id = $(item).attr('id')
		const name = id
		const camelizedName = camelize(name)
		const path = $(item)
			.html()
			.replaceAll(' d', '\n			d')
			.replaceAll(' stroke', '\n			stroke')
			.replaceAll('></', '\n		></')
			.replaceAll('><path', '>\n		<path')
			.replaceAll('stroke-width="1.6"', 'stroke-width={props.stroke}')
		const html = `import { defineComponent } from 'vue'

export const iconComponentProps = {
	width: {
		type: Number,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	stroke: {
		type: Number,
		required: true,
	},
}

export default defineComponent({
	props: iconComponentProps,
	setup(props) {
		return () => (
			<svg
				id="${id}"
				fill="currentColor"
				viewBox="0 0 24 24"
				width={props.width}
				height={props.height}
			>
			${path}
			</svg>
		)
	},
})
`

		fs.writeFileSync(`${VUE_PATH}/generated/${name}.tsx`, html)
		componentNames.push({
			name,
			camelizedName,
			id,
		})
	})

	const typingsContent = `export type IconSize = 'sm' | 'md' | 'lg'
export type _IconProps = {
	width: number
	height: number
	stroke: number
}
export type IconName =
${componentNames
	.map(({name}) => {
		return `	| '${name}'`
	})
	.join('\n')}
`
	fs.writeFileSync(`${VUE_PATH}/types.ts`, typingsContent)

const constantsContent = `import { IconName } from './types'
export const iconList: IconName[] = [
${componentNames
	.map(({name}) => {
		return `	'${name}',`
	})
	.join('\n')}
]
`
	fs.writeFileSync(`${VUE_PATH}/constants.ts`, constantsContent)

	const indexContent = `import { defineComponent, computed, ExtractPublicPropTypes } from 'vue'
import { definePropType } from '../../utils'
import { IconSize, IconName, _IconProps } from './types.ts'

${componentNames
	.map((component) => {
		return `import ${component.camelizedName} from './generated/${component.name}.tsx'`
	})
	.join('\n')}

export const iconProps = {
	name: {
		type: definePropType<IconName>(String),
		required: true,
	},
	size: {
		type: definePropType<IconSize>(String),
		default: 'md',
	},
} as const

export type IconProps = ExtractPublicPropTypes<typeof iconProps>

const components = {
	${componentNames
		.map((component) => {
			return `${component.camelizedName},`
		})
		.join('\n	')}
}

export const Icon = defineComponent({
	name: 'Icon',
	components: components,
	props: iconProps,
	setup(props) {
		const sizes: Record<IconSize, _IconProps> = {
			sm: {
				width: 16,
				height: 16,
				stroke: 1.8, // (reproportion from viewbox: (24 / 16) * 1.2)
			},
			md: {
				width: 20,
				height: 20,
				stroke: 1.68, // (reproportion from viewbox: (24 / 20) * 1.4)
			},
			lg: {
				width: 24,
				height: 24,
				stroke: 1.6,
			},
		}
		const currentSize = computed(() => {
			const size = sizes[props.size]
			return size ? size : sizes.md
		})

		const camelize = (s: IconName) => s.replace(/-./g, (x) => x[1].toUpperCase()) as keyof typeof components
		const iconComponent = computed(() => (props.name ? components[camelize(props.name)] : ''))

		return () => (
			<iconComponent.value
				width={currentSize.value.width}
				height={currentSize.value.height}
				stroke={currentSize.value.stroke}
			/>
		)
	},
})
`
	fs.writeFileSync(`${VUE_PATH}/index.tsx`, indexContent)


	const storyBookContent = `import { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '../index.tsx'

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: {
				type: 'select',
			},
			options: [
				${componentNames
				.map((component) => {
					return `'${component.name}'`
				})
				.join(',\n				')}
			],
			default: 'x',
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['sm', 'md', 'lg'],
			default: 'md',
		},
	},
}
export default meta
type Story = StoryObj<typeof meta>

export const View: Story = {
	render: (args) => ({
		components: {
			Icon,
		},
		setup() {
			return () => (
				<Icon
					name={args.name}
					size={args.size}
				/>
			)
		},
	}),
}

export const FullKit: Story = {
	render: (args) => ({
		components: { Icon },
		setup() {
			return () => (
				<div style='display: flex; flex-wrap: wrap; gap: 16px;'>
					${componentNames
						.map((component) => {
							return `<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'${component.name}'} size={args.size} />
						<span style='font-size: 12px'>${component.name}</span>
					</div>`
						})
						.join('\n					')
					}
				</div>
			)
		}
	})
}
`
	fs.writeFileSync(`${VUE_PATH}/stories/icon.stories.tsx`, storyBookContent)
}

generate()
