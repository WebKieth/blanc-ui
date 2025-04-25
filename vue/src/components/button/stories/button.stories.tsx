import { Meta, StoryObj } from '@storybook/vue3'
import { Button, buttonEmitters, buttonProps } from '../Button'
import { defineComponent } from 'vue'
import { definePropType } from '../../../utils'
import cn from 'classnames'
import { myButtonStyleVariants } from './examples.css'
// import { boxStyle, rowStyle, wrapperStyle } from './styles.css'

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

const MyButton = defineComponent({
	props: {
		size: {
			type: definePropType<'small' | 'medium' | 'large'>(String),
			default: 'medium'
		},
		variant: {
			type: definePropType<'primary' | 'secondary'>(String),
			default: 'primary'
		},
		rounded: {
			type: definePropType<boolean>(Boolean),
			default: false
		},
		...buttonProps
	},
	emits: buttonEmitters,
	setup(
		{ blancStyle, size, variant, rounded, ...rest },
		{ emit, slots }
	) {
		return () => (
			<Button
				{...rest}
				blancStyle={cn(
					blancStyle,
					myButtonStyleVariants[size],
					myButtonStyleVariants[variant],
					{
						[myButtonStyleVariants.rounded]: rounded
					}
				)}
				
				onClick={(e) => emit('click', e)}
			>
				{slots.default && slots.default()}
			</Button>
		)
	}
})

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
