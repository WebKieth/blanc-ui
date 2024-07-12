import { Meta, StoryObj } from '@storybook/vue3'
import { Checkbox } from '../index'
import { ref } from 'vue'

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
			default: 'medium',
		}
	}
}
export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	render: (args) => ({
		components: {
			Checkbox,
		},
		setup() {
			const checked = ref(false)
			const handleCheck = (newValue: boolean) => checked.value = newValue
			return () => (
				<Checkbox
					label={'label'}
					caption={'caption text'}
					value={checked.value}
					size={args.size}
					whenChange={handleCheck}
				/>
			)
		},
	}),
}