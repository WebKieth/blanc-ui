import { Meta, StoryObj } from '@storybook/react'
import { fn } from "@storybook/test"

import { Input } from '..'
import { useState } from 'react'

const meta: Meta<typeof Input> = {
	component: Input,
	title: 'Components/Input',
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: {
				type: 'select'
			},
			options: ['text', 'number', 'date'],
			default: 'text'
		},
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
		disabled: {
			control: {
				type: 'boolean'
			},
			default: false
		}
	},
	args: {
		type: 'text',
		size: 'medium',
		label: 'label',
		disabled: false,
		onChange: fn(),
		onInput: fn()
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = useState('')
		return <Input
			type={args.type}
			size={args.size}
			label={args.label}
			disabled={args.disabled}
			value={value}
			onChange={(value) => setValue(value as string)}
		/>
	}
}