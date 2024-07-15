import { Meta, StoryObj } from '@storybook/vue3'
import { Dropdown } from '../index'
import { ref } from 'vue'
import { Button } from '../../button'

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	argTypes: {
		gutter: {
			control: {
				type: 'number'
			},
			default: 12
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
			default: 'medium',
		},
		placement: {
			control: {
				type: 'select',
			},
			options: [
				'top',
				'bottom',
				'left',
				'right',
				'top-left',
				'top-right',
				'bottom-left',
				'bottom-right',
				'left-top',
				'left-bottom',
				'right-top',
				'right-bottom',
			],
			default: 'bottom'
		}
	}
}
export default meta

type Story = StoryObj<typeof meta>

/**
 * Ready: automatically position reset 
 * on parent mutation or window resize  
 * TODO: automatically limit and reset current placement 
 * when dropdown body goes beyond boundaries of document body
 */
export const Basic: Story = {
	render: (args) => ({
		components: {
			Dropdown,
			Button
		},
		setup() {
			const gap = ref(12)
			const updateGap = () => gap.value === 12 ? gap.value = 128 : gap.value = 12
			return () => (
				<div style={{height: '100px', overflow: 'auto'}}>
					<Button whenClick={updateGap}>update gap</Button>
					<div style={{display: 'flex', gap: `${gap.value}px`}}>
						<Dropdown
							placement={args.placement}
							size={args.size}
							gutter={args.gutter}
						>
							{{
								agent: () => <span>{'click me!'}</span>,
								default: () => 'Hello'
							}}
						</Dropdown>
						<Dropdown
							placement={args.placement}
							size={args.size}
							gutter={args.gutter}
						>
							{{
								agent: () => <span>{'and click me!'}</span>,
								default: () => 'Hello 2'
							}}
						</Dropdown>
					</div>
					<span>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique exercitationem incidunt impedit iusto, ullam ratione molestiae ipsa nulla fugiat ab praesentium, corrupti unde dolores quidem, atque harum sapiente quae. Neque.'}</span>
					<span>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique exercitationem incidunt impedit iusto, ullam ratione molestiae ipsa nulla fugiat ab praesentium, corrupti unde dolores quidem, atque harum sapiente quae. Neque.'}</span>
					<span>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique exercitationem incidunt impedit iusto, ullam ratione molestiae ipsa nulla fugiat ab praesentium, corrupti unde dolores quidem, atque harum sapiente quae. Neque.'}</span>
					<span>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique exercitationem incidunt impedit iusto, ullam ratione molestiae ipsa nulla fugiat ab praesentium, corrupti unde dolores quidem, atque harum sapiente quae. Neque.'}</span>
					<span>{'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique exercitationem incidunt impedit iusto, ullam ratione molestiae ipsa nulla fugiat ab praesentium, corrupti unde dolores quidem, atque harum sapiente quae. Neque.'}</span>
				</div>
				
			)
		},
	}),
}