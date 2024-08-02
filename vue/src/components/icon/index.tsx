import { defineComponent, computed, ExtractPublicPropTypes } from 'vue'
import { definePropType } from '../../utils'
import { IconSize, IconName, _IconProps } from './types.ts'

import riArrowRightSLine from './generated/ri-arrow-right-s-line.tsx'
import riArrowUpSLine from './generated/ri-arrow-up-s-line.tsx'
import riArrowLeftSLine from './generated/ri-arrow-left-s-line.tsx'
import riArrowDownSLine from './generated/ri-arrow-down-s-line.tsx'
import riCheckFill from './generated/ri-check-fill.tsx'
import riCheckLine from './generated/ri-check-line.tsx'
import riCheckboxBlankCircleFill from './generated/ri-checkbox-blank-circle-fill.tsx'
import riCheckboxBlankCircleLine from './generated/ri-checkbox-blank-circle-line.tsx'
import riCheckboxBlankFill from './generated/ri-checkbox-blank-fill.tsx'
import riCheckboxBlankLine from './generated/ri-checkbox-blank-line.tsx'
import riCheckboxCircleFill from './generated/ri-checkbox-circle-fill.tsx'
import riCheckboxCircleLine from './generated/ri-checkbox-circle-line.tsx'
import riCheckboxFill from './generated/ri-checkbox-fill.tsx'
import riCheckboxIndeterminateFill from './generated/ri-checkbox-indeterminate-fill.tsx'
import riCheckboxIndeterminateLine from './generated/ri-checkbox-indeterminate-line.tsx'
import riCheckboxLine from './generated/ri-checkbox-line.tsx'
import riCloseCircleFill from './generated/ri-close-circle-fill.tsx'
import riCloseCircleLine from './generated/ri-close-circle-line.tsx'
import riCloseLine from './generated/ri-close-line.tsx'
import riAttachment2 from './generated/ri-attachment-2.tsx'
import riAttachmentFill from './generated/ri-attachment-fill.tsx'
import riAttachmentLine from './generated/ri-attachment-line.tsx'
import riMessageFill from './generated/ri-message-fill.tsx'
import riMessageLine from './generated/ri-message-line.tsx'
import riErrorWarningFill from './generated/ri-error-warning-fill.tsx'
import riErrorWarningLine from './generated/ri-error-warning-line.tsx'
import riAlertFill from './generated/ri-alert-fill.tsx'
import riAlertLine from './generated/ri-alert-line.tsx'
import riAlarmWarningFill from './generated/ri-alarm-warning-fill.tsx'
import riAlarmWarningLine from './generated/ri-alarm-warning-line.tsx'

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

const components = {
	riArrowRightSLine,
	riArrowUpSLine,
	riArrowLeftSLine,
	riArrowDownSLine,
	riCheckFill,
	riCheckLine,
	riCheckboxBlankCircleFill,
	riCheckboxBlankCircleLine,
	riCheckboxBlankFill,
	riCheckboxBlankLine,
	riCheckboxCircleFill,
	riCheckboxCircleLine,
	riCheckboxFill,
	riCheckboxIndeterminateFill,
	riCheckboxIndeterminateLine,
	riCheckboxLine,
	riCloseCircleFill,
	riCloseCircleLine,
	riCloseLine,
	riAttachment2,
	riAttachmentFill,
	riAttachmentLine,
	riMessageFill,
	riMessageLine,
	riErrorWarningFill,
	riErrorWarningLine,
	riAlertFill,
	riAlertLine,
	riAlarmWarningFill,
	riAlarmWarningLine,
}

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
