import { Meta, StoryObj } from "@storybook/vue3";
import { Textarea } from "../Textarea";
import { ref } from "vue";
import { customPlaceholder, customPlaceholderStar, customPlaceholderText, customPlaceholderText2 } from "./styles.css";

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
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
    },
    label: {
      control: {
        type: 'text'
      },
      default: 'label'
    }
  },
  args: {
    label: 'label',
    disabled: false,
    size: 'medium'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const val = ref('')
      const changeVal = (value: string) => val.value = value
      return () => (
        <Textarea
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
    components: { Textarea },
    setup() {
      const val = ref('')
      const changeVal = (value: string) => val.value = value
      return () => (
        <Textarea
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
        </Textarea>
      )
    }
  })
}