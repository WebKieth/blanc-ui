import { Meta, StoryObj } from '@storybook/vue3'
import Button from '../Button.vue'
import MyButton from './MyButton.vue'

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {

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

export const Default: Story = {
	render: (args) => ({
		components: { Button },
		setup() {
			return () => (
				<Button disabled={args.disabled}>
					label
				</Button>
			)
		}
	})
}


export const Composition: Story = {
	render: (args) => ({
		components: { MyButton },
		setup() {
			return () => (
				<MyButton disabled={args.disabled}>
					label
				</MyButton>
			)
		}
	})
}
