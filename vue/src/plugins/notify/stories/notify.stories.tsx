import { Meta, StoryObj } from '@storybook/vue3'
import { Notify, $notify } from '..'
import { Button } from '../../../components/button'
import { Checkbox } from '../../../components/checkbox'
import { Input } from '../../../components/input/Input'
// import Select from '@/components/select/index.vue'
import { inject, ref } from 'vue'
import { NotifyPosition } from '../types'
import { wrapperStyle } from './styles.css'

const meta: Meta<typeof Notify> = {
	title: 'Plugins/Notify',
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof Notify>

export const Default: Story = {
	render: () => ({
		components: {
			Input,
			// Select,
			Button,
			Checkbox,
		},
		setup() {
			const notify: Notify | undefined = inject($notify)
			const toastList = ref<string[]>([])
			const autoHide = ref<boolean>(false)
			const setAutoHide = (newValue: boolean) => {
				autoHide.value = newValue
			}
			const closable = ref<boolean>(false)
			const setClosable = (newValue: boolean) => {
				closable.value = newValue
			}
			const title = ref<string>('Short descriptive message')
			const setTitle = (newTitle: string) => {
				title.value = newTitle
			}
			const text = ref<string>(
				'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
			)
			const setText = (newText: string) => {
				text.value = newText
			}
			// const positions: NotifyPosition[] = ['bottom', 'top', 'bottomLeft', 'bottomRight', 'topLeft', 'topRight']
			const position = ref<NotifyPosition>('bottom')
			// const changePosition = (newPosition: NotifyPosition) => {
			// 	position.value = newPosition
			// }
			const call = () => {
				const toastId = notify?.push({
					position: position.value,
					title: title.value,
					summary: text.value,
					autoHide: autoHide.value,
					closable: closable.value,
				})
				if (toastId === undefined) return
				toastList.value.push(toastId)
			}
			const remove = () => {
				const lastToastId = toastList.value[toastList.value.length - 1]
				notify?.remove(lastToastId)
				toastList.value.splice(toastList.value.length - 1, 1)
			}
			return () => (
				<div class={wrapperStyle}>
					<Input value={title.value} whenChange={(value) => setTitle(`${value}`)} />
					<Input value={text.value} whenChange={(value) => setText(`${value}`)} />
					<Checkbox label='autoHide' value={autoHide.value} whenChange={setAutoHide} />
					<Checkbox label='closable' value={closable.value} whenChange={setClosable} />
					<Button whenClick={() => call()}>show toast</Button>
					<Button whenClick={() => remove()}>hide toast</Button>
				</div>
			)
		}
	})
}
