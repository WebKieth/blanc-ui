import { Meta, StoryObj } from '@storybook/vue3'
import { Input } from '../Input'
import { ref } from 'vue'
import { customPlaceholder, customPlaceholderStar, customPlaceholderText, customPlaceholderText2 } from './styles.css'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      default: 'medium',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['number', 'string'],
      default: 'string'
    },
    disabled: {
      control: {
        type: 'boolean'
      },
      default: false
    },
    label: {
      control: {
        type: 'text'
      },
      default: 'label'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const val = ref('')
      const changeVal = (value: string) => val.value = value
      return () => (
        <Input
          type={args.type}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
          value={val.value}
          placeholder='Basic placeholder'
          onInput={(value) => changeVal(value as string)}
        />
      )
    }
  })
}

export const CustomPlaceholder: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const val = ref('')
      const changeVal = (value: string) => val.value = value
      return () => (
        <Input
          type={args.type}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
          value={val.value}
          onInput={(value) => changeVal(value as string)}
        >
          {{
            placeholder: () => (
              <div class={customPlaceholder}>
                <span class={customPlaceholderText}>Custom</span>
                <span class={customPlaceholderText2}>placeholder</span>
                <span class={customPlaceholderStar}>*</span>
              </div>
            )
          }}
        </Input>
      )
    }
  })
}