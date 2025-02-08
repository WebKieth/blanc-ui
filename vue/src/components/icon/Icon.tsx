import { defineComponent, computed, ExtractPublicPropTypes } from 'vue'
import { definePropType } from '../../utils/index.ts'
import { IconSize, IconName, IconProps as _IconProps } from '@shared/components/icon'

import * as components from './components'

export const iconProps = {
	name: {
		type: definePropType<IconName>(String),
		required: true,
	},
	size: {
		type: definePropType<IconSize>(String),
		default: 'medium',
	},
} as const

export type IconProps = ExtractPublicPropTypes<typeof iconProps>

export const Icon = defineComponent({
	name: 'Icon',
	components: components,
	props: iconProps,
	setup(props) {
		const sizes: Record<IconSize, _IconProps> = {
			small: {
				width: 16,
				height: 16,
				stroke: 1.8, // (reproportion from viewbox: (24 / 16) * 1.2)
			},
			medium: {
				width: 20,
				height: 20,
				stroke: 1.68, // (reproportion from viewbox: (24 / 20) * 1.4)
			},
			large: {
				width: 24,
				height: 24,
				stroke: 1.6,
			},
		}
		const currentSize = computed(() => {
			const size = sizes[props.size]
			return size ? size : sizes.medium
		})

		const camelize = (s: IconName) => s.replace(/-./g, (x) => x[1].toUpperCase()) as keyof typeof components
		const IconComponent = computed(() => (props.name ? components[camelize(props.name)] : ''))

		return () => (
			<IconComponent.value
				{...currentSize.value}
			/>
		)
	},
})
