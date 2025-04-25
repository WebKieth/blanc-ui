import { Meta, StoryObj } from '@storybook/react'
import { fn } from "@storybook/test"
import cn from 'classnames'

import { Button, ButtonProps, buttonStyle } from ".."
import { FC } from 'react'
import { myButtonStyleVariants } from './examples.css'

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Components/Button',
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: {
				type: 'boolean'
			},
			default: false
		}
	},
	args: {
		children: 'label',
		disabled: false,
		onClick: fn()
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => {
		return <Button
			disabled={args.disabled}
			onClick={args.onClick}
		>{args.children}</Button>
	}
}

type MyButtonProps = {
	size?: 'small' | 'medium' | 'large'
	variant?: 'primary' | 'secondary'
	rounded?: boolean
} & ButtonProps

const MyButton: FC<MyButtonProps> = ({
	children,
	size = 'medium',
	variant = 'primary',
	rounded = false,
	...rest
}) => {
	return <Button
		style={cn(
			buttonStyle,
			myButtonStyleVariants[size],
			myButtonStyleVariants[variant],
			{ [myButtonStyleVariants.rounded]: rounded }
		)}
		{...rest}
	>{children}</Button>
}

export const Composition: Story = {
	render: (args) => {
		return <MyButton
			disabled={args.disabled}
			onClick={args.onClick}
		>{args.children}</MyButton>
	}
}