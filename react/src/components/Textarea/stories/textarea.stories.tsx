import { Meta, StoryObj } from '@storybook/react'
import { fn } from "@storybook/test"

import { Textarea } from '../Textarea'
import { useState } from 'react'
import { customPlaceholder, customPlaceholderStar, customPlaceholderText, customPlaceholderText2 } from './styles.css'

const meta: Meta<typeof Textarea> = {
	component: Textarea,
	title: 'Components/Textarea',
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
		return <Textarea
			size={args.size}
			label={args.label}
			disabled={args.disabled}
			value={value}
			placeholder='Basic placeholder'
			onChange={setValue}
		/>
	}
}

export const CustomPlaceholder: Story = {
	render: (args) => {
		const [value, setValue] = useState('')
		return <Textarea
			size={args.size}
			label={args.label}
			disabled={args.disabled}
			value={value}
			onChange={setValue}
			renderPlaceholder={<div className={customPlaceholder}>
				<span className={customPlaceholderText}>Custom</span>
				<span className={customPlaceholderText2}>placeholder</span>
				<span className={customPlaceholderStar}>*</span>
			</div>}
		/>
	}
}