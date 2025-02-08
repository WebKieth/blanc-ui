import { Meta, StoryObj } from '@storybook/vue3'
import { Checkbox } from '../Checkbox'
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
		},
		label: {
			control: {
				type: 'text'
			},
			default: 'label'
		},
		caption: {
			control: {
				type: 'text'
			},
			default: 'caption'
		},
		disabled: {
			control: {
				type: 'boolean'
			},
			default: false
		}
	},
	args: {
    size: 'medium',
    label: 'label',
    caption: 'caption',
    disabled: false
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
					label={args.label}
					caption={args.caption}
					value={checked.value}
					size={args.size}
					disabled={args.disabled}
					whenChange={handleCheck}
				/>
			)
		},
	}),
}