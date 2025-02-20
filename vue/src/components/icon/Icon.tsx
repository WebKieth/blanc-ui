import { defineComponent, computed, ExtractPublicPropTypes, inject, ref, Ref } from 'vue'
import { definePropType } from '../../utils/index.ts'
import { IconSize, IconProps as _IconProps } from '../../../../shared/components/icon'

import { $iconify, $icons, IconComponents } from '../../plugins/iconify'

export const iconProps = {
	name: {
		type: definePropType<string>(String),
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
	props: iconProps,
	setup(props) {
		const sizes: Record<IconSize, _IconProps> = {
			small: {
				width: 16,
				height: 16,
			},
			medium: {
				width: 20,
				height: 20,
			},
			large: {
				width: 24,
				height: 24,
			},
		}
		const currentSize = computed(() => {
			const size = sizes[props.size]
			return size ? size : sizes.medium
		})
		const components = inject<IconComponents | undefined>($icons, undefined)
		const IconComponent = computed(() => (props.name && components ? components[props.name] : null))

		const { sprite: spriteXml } = inject<{ sprite: Ref<Document | null> }>($iconify, { sprite: ref(null) })

		const svg = computed(() => {
			if (!spriteXml.value) return
			const icon = spriteXml.value.querySelector(`#${props.name}`)
			return icon
		})

		const viewbox = computed(() => svg.value?.getAttribute('viewBox'))


		return () => (
			IconComponent.value
				? <IconComponent.value {...currentSize} />
				: svg.value
					? <svg
						viewBox={viewbox.value || '0 0 24 24'}
						width={currentSize.value.width}
						height={currentSize.value.height}
						v-html={svg.value.innerHTML}
					></svg>
					: <></>
		)
	},
})
