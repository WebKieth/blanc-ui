import { Meta, StoryObj } from '@storybook/vue3'
import { Radio } from '../Radio'
import { ref } from 'vue'
import { radioWrapper } from './styles.css'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
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
    caption: {
      control: {
        type: 'text'
      },
      default: 'caption'
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
    caption: 'caption',
    disabled: false
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: {
      Radio
    },
    setup() {
      const keys = ['One', 'Two', 'Three']
      const selected = ref('One')
      const handleCheck = (newValue: string) => selected.value = newValue

      return () => (
        <div class={radioWrapper}>
          {keys.map((key) => (
            <Radio
              size={args.size}
              disabled={args.disabled}
              label={args.label}
              caption={`${args.caption} (key: ${key})`}
              key={key}
              checked={selected.value === key}
              onCheck={() => handleCheck(key)}
            />
          ))}
        </div>
      )
    }
  })
}