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
								<div>{'primary'}</div>
								<Button size='large'>Large</Button>
								<Button>Medium</Button>
								<Button size='small'>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'secondary'}</div>
								<Button variant='secondary' size='large'>Large</Button>
								<Button variant='secondary'>Medium</Button>
								<Button variant='secondary' size='small'>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'outlined'}</div>
								<Button variant='outlined' size='large'>Large</Button>
								<Button variant='outlined'>Medium</Button>
								<Button variant='outlined' size='small'>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'clean'}</div>
								<Button variant='clean' size='large'>Large</Button>
								<Button variant='clean'>Medium</Button>
								<Button variant='clean' size='small'>Small</Button>
							</div>
						</div>
					</div>
					<div class={boxStyle}>
						<div>{'disabled variants'}</div>
						<div class={rowStyle}>
							<div class={boxStyle}>
								<div>{'primary'}</div>
								<Button size='large' disabled>Large</Button>
								<Button disabled>Medium</Button>
								<Button size='small' disabled>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'secondary'}</div>
								<Button variant='secondary' size='large' disabled>Large</Button>
								<Button variant='secondary' disabled>Medium</Button>
								<Button variant='secondary' size='small' disabled>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'outlined'}</div>
								<Button variant='outlined' size='large' disabled>Large</Button>
								<Button variant='outlined' disabled>Medium</Button>
								<Button variant='outlined' size='small' disabled>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'clean'}</div>
								<Button variant='clean' size='large' disabled>Large</Button>
								<Button variant='clean' disabled>Medium</Button>
								<Button variant='clean' size='small' disabled>Small</Button>
							</div>
						</div>
					</div>
					<div class={boxStyle}>
						<div>{'active variants'}</div>
						<div class={rowStyle}>
							<div class={boxStyle}>
								<div>{'primary'}</div>
								<Button size='large' active>Large</Button>
								<Button active>Medium</Button>
								<Button size='small' active>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'secondary'}</div>
								<Button variant='secondary' size='large' active>Large</Button>
								<Button variant='secondary' active>Medium</Button>
								<Button variant='secondary' size='small' active>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'outlined'}</div>
								<Button variant='outlined' size='large' active>Large</Button>
								<Button variant='outlined' active>Medium</Button>
								<Button variant='outlined' size='small' active>Small</Button>
							</div>
							<div class={boxStyle}>
								<div>{'clean'}</div>
								<Button variant='clean' size='large' active>Large</Button>
								<Button variant='clean' active>Medium</Button>
								<Button variant='clean' size='small' active>Small</Button>
							</div>
						</div>
					</div>
				</div>
			)
		}
	})
}