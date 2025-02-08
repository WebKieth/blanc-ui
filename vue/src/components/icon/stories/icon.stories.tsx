import { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '../index'
import { iconList } from '@shared/components/icon/list'
import { wrapperStyle, boxStyle, labelStyle } from '@shared/components/icon/stories/fullKitStyles.css'

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: {
				type: 'select',
			},
			options: [...iconList],
			default: 'x',
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
			default: 'medium',
		},
	},
	args: {
		name: iconList[0],
		size: 'medium'
	}
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
				<div class={wrapperStyle}>
					<div class={boxStyle}>
						<Icon name={'ri-arrow-right-s-line'} size={args.size} />
						<span class={labelStyle}>ri-arrow-right-s-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-arrow-up-s-line'} size={args.size} />
						<span class={labelStyle}>ri-arrow-up-s-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-arrow-left-s-line'} size={args.size} />
						<span class={labelStyle}>ri-arrow-left-s-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-arrow-down-s-line'} size={args.size} />
						<span class={labelStyle}>ri-arrow-down-s-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-check-fill'} size={args.size} />
						<span class={labelStyle}>ri-check-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-check-line'} size={args.size} />
						<span class={labelStyle}>ri-check-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-blank-circle-fill'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-blank-circle-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-blank-circle-line'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-blank-circle-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-blank-fill'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-blank-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-blank-line'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-blank-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-circle-fill'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-circle-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-circle-line'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-circle-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-fill'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-indeterminate-fill'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-indeterminate-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-indeterminate-line'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-indeterminate-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-checkbox-line'} size={args.size} />
						<span class={labelStyle}>ri-checkbox-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-close-circle-fill'} size={args.size} />
						<span class={labelStyle}>ri-close-circle-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-close-circle-line'} size={args.size} />
						<span class={labelStyle}>ri-close-circle-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-close-line'} size={args.size} />
						<span class={labelStyle}>ri-close-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-attachment-2'} size={args.size} />
						<span class={labelStyle}>ri-attachment-2</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-attachment-fill'} size={args.size} />
						<span class={labelStyle}>ri-attachment-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-attachment-line'} size={args.size} />
						<span class={labelStyle}>ri-attachment-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-message-fill'} size={args.size} />
						<span class={labelStyle}>ri-message-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-message-line'} size={args.size} />
						<span class={labelStyle}>ri-message-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-error-warning-fill'} size={args.size} />
						<span class={labelStyle}>ri-error-warning-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-error-warning-line'} size={args.size} />
						<span class={labelStyle}>ri-error-warning-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-alert-fill'} size={args.size} />
						<span class={labelStyle}>ri-alert-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-alert-line'} size={args.size} />
						<span class={labelStyle}>ri-alert-line</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-alarm-warning-fill'} size={args.size} />
						<span class={labelStyle}>ri-alarm-warning-fill</span>
					</div>
					<div class={boxStyle}>
						<Icon name={'ri-alarm-warning-line'} size={args.size} />
						<span class={labelStyle}>ri-alarm-warning-line</span>
					</div>
				</div>
			)
		}
	})
}
