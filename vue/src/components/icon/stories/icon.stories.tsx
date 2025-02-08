import { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '../index'
import { iconList } from '@shared/components/icon/list'

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
					name={args.name || iconList[0]}
					size={args.size || 'medium'}
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
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-arrow-right-s-line'} size={args.size} />
						<span style='font-size: 12px'>ri-arrow-right-s-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-arrow-up-s-line'} size={args.size} />
						<span style='font-size: 12px'>ri-arrow-up-s-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-arrow-left-s-line'} size={args.size} />
						<span style='font-size: 12px'>ri-arrow-left-s-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-arrow-down-s-line'} size={args.size} />
						<span style='font-size: 12px'>ri-arrow-down-s-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-check-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-check-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-check-line'} size={args.size} />
						<span style='font-size: 12px'>ri-check-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-blank-circle-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-blank-circle-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-blank-circle-line'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-blank-circle-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-blank-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-blank-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-blank-line'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-blank-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-circle-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-circle-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-circle-line'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-circle-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-indeterminate-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-indeterminate-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-indeterminate-line'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-indeterminate-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-checkbox-line'} size={args.size} />
						<span style='font-size: 12px'>ri-checkbox-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-close-circle-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-close-circle-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-close-circle-line'} size={args.size} />
						<span style='font-size: 12px'>ri-close-circle-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-close-line'} size={args.size} />
						<span style='font-size: 12px'>ri-close-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-attachment-2'} size={args.size} />
						<span style='font-size: 12px'>ri-attachment-2</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-attachment-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-attachment-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-attachment-line'} size={args.size} />
						<span style='font-size: 12px'>ri-attachment-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-message-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-message-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-message-line'} size={args.size} />
						<span style='font-size: 12px'>ri-message-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-error-warning-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-error-warning-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-error-warning-line'} size={args.size} />
						<span style='font-size: 12px'>ri-error-warning-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-alert-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-alert-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-alert-line'} size={args.size} />
						<span style='font-size: 12px'>ri-alert-line</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-alarm-warning-fill'} size={args.size} />
						<span style='font-size: 12px'>ri-alarm-warning-fill</span>
					</div>
					<div style='width: 10%; display: flex; flex-direction: column; align-items: center; margin-bottom: 12px; gap: 8px;'>
						<Icon name={'ri-alarm-warning-line'} size={args.size} />
						<span style='font-size: 12px'>ri-alarm-warning-line</span>
					</div>
				</div>
			)
		}
	})
}
