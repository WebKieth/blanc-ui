import { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '../Button'

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
		},
		disabled: {
			control: {
				type: 'boolean'
			},
			default: false
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
					disabled={args.disabled}
				>
					label
				</Button>
			)
		}
	})
}