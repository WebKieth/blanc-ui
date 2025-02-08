import { Meta, StoryObj } from '@storybook/vue3'
import { Input } from '../Input'
import { ref } from 'vue'

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
			default: 'medium',
		},
		type: {
			control: {
				type: 'select',
			},
			options: ['number', 'string'],
			default: 'string'
		},
		disabled: {
			control: {
				type: 'boolean'
			},
			default: false
		},
		label: {
			control: {
				type: 'text'
			},
			default: 'label'
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	render: (args) => ({
		components: { Input },
		setup() {
			const val = ref('')
			const changeVal = (value: string) => val.value = value
			return () => (
				<Input
					type={args.type}
					size={args.size}
					disabled={args.disabled}
					label={args.label}
					value={val.value}
					whenInput={(value) => changeVal(value as string)}
				/>
			)
		}
	})
}