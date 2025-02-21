import { Meta, StoryObj } from '@storybook/react'
import { fn } from "@storybook/test"

import { Button } from ".."
import { useEffect, useRef } from 'react'

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Components/Button',
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
	},
	args: {
		variant: 'primary',
		size: 'medium',
		children: 'label',
		disabled: false,
		onClick: fn()
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => {
		const buttonRef = useRef<HTMLButtonElement | null>(null)
		useEffect(() => {
			console.log(buttonRef)
		}, [])
		return <Button
			ref={buttonRef}
			variant={args.variant}
			size={args.size}
			disabled={args.disabled}
			onClick={args.onClick}
		>{args.children}</Button>
	}
}