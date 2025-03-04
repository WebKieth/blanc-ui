import { Meta, StoryObj } from '@storybook/vue3'
import { Select } from '../Select'
import { ref } from 'vue'
import { OptionId } from '../types'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
      'Option 9',
    ],
    value: undefined
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref<OptionId | undefined>(undefined)
      return () => (
        <Select
          options={args.options}
          value={selected.value}
          onChange={(value) => selected.value = value as OptionId}
        />
      )
    }
  })
}

export const MultipleValues: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref<OptionId[]>([])
      return () => (
        <Select
          options={args.options}
          value={selected.value}
          onChange={(value) => selected.value = value as OptionId[]}
        />
      )
    }
  })
}