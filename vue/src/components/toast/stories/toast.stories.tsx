import { Meta, StoryObj } from '@storybook/vue3'
import { Toast } from '../index'
import { iconList } from '../../icon/constants'

const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
			default: 'medium', 
		},
		iconName: {
			control: {
				type: 'select',
			},
			options: iconList,
			default: 'ri-message-line', 
		},
		title: {
			control: {
				type: 'text'
			},
		},
		message: {
			control: {
				type: 'text'
			},
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	render: (args) => ({
		components: { Toast },
		setup() {
			return () => (
				<Toast
					size={args.size}
					iconName={args.iconName}
					title={args.title || 'title'}
					message={args.message || 'message content text'}
				/>
			)
		}
	})
}