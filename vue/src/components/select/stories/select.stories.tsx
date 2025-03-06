import { Meta, StoryObj } from '@storybook/vue3'
import { Select } from '../Select'
import { ref } from 'vue'
import { OptionId } from '../types'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text'
      },
      default: 'label'
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      default: 'medium',
    },
    disabled: {
      control: {
        type: 'boolean'
      },
      default: false
    }
  },
  args: {
    disabled: false,
    label: 'label',
    size: 'medium',
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
          disabled={args.disabled}
          label={args.label}
          size={args.size}
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
          label={args.label}
          options={args.options}
          size={args.size}
          value={selected.value}
          onChange={(value) => selected.value = value as OptionId[]}
        />
      )
    }
  })
}