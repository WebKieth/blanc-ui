import { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '../Button'
import { boxStyle, rowStyle, wrapperStyle } from './styles.css'

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

export const FullKit: Story = {
	render: () => ({
		setup() {
			return () => (
				<div class={wrapperStyle}>
					<div class={boxStyle}>
						<div>{'basic variants'}</div>
						<div class={rowStyle}>
							<div class={boxStyle}>
								<div>{'brand'}</div>
								<Button size='large'>Large</Button>
								<Button>Medium</Button>
								<Button size='small'>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'info'}</div>
								<Button variant='info' size='large'>Large</Button>
								<Button variant='info'>Medium</Button>
								<Button variant='info' size='small'>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'warning'}</div>
								<Button variant='warning' size='large'>Large</Button>
								<Button variant='warning'>Medium</Button>
								<Button variant='warning' size='small'>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'success'}</div>
								<Button variant='success' size='large'>Large</Button>
								<Button variant='success'>Medium</Button>
								<Button variant='success' size='small'>Small</Button>
							</div>
						</div>
					</div>
					<div class={boxStyle}>
						<div>{'disabled variants'}</div>
						<div class={rowStyle}>
							<div class={boxStyle}>
								<div>{'brand'}</div>
								<Button size='large' disabled>Large</Button>
								<Button disabled>Medium</Button>
								<Button size='small' disabled>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'info'}</div>
								<Button variant='info' size='large' disabled>Large</Button>
								<Button variant='info' disabled>Medium</Button>
								<Button variant='info' size='small' disabled>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'warning'}</div>
								<Button variant='warning' size='large' disabled>Large</Button>
								<Button variant='warning' disabled>Medium</Button>
								<Button variant='warning' size='small' disabled>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'success'}</div>
								<Button variant='success' size='large' disabled>Large</Button>
								<Button variant='success' disabled>Medium</Button>
								<Button variant='success' size='small' disabled>Small</Button>
							</div>
						</div>
					</div>
					<div class={boxStyle}>
						<div>{'active variants'}</div>
						<div class={rowStyle}>
							<div class={boxStyle}>
								<div>{'brand'}</div>
								<Button size='large' active>Large</Button>
								<Button active>Medium</Button>
								<Button size='small' active>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'info'}</div>
								<Button variant='info' size='large' active>Large</Button>
								<Button variant='info' active>Medium</Button>
								<Button variant='info' size='small' active>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'warning'}</div>
								<Button variant='warning' size='large' active>Large</Button>
								<Button variant='warning' active>Medium</Button>
								<Button variant='warning' size='small' active>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'success'}</div>
								<Button variant='success' size='large' active>Large</Button>
								<Button variant='success' active>Medium</Button>
								<Button variant='success' size='small' active>Small</Button>
							</div>
						</div>
					</div>
				</div>
			)
		}
	})
}