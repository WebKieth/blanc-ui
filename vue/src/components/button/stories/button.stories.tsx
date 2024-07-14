import { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '../index'

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
			default: 'medium',
		},
		variant: {
			control: {
				type: 'select',
			},
			options: ['primary', 'secondary', 'outlined', 'clean'],
			default: 'primary',
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	render: (args) => ({
		components: { Button },
		setup() {
			return () => (
				<Button
					size={args.size}
					variant={args.variant}
				>
					label
				</Button>
			)
		}
	})
}