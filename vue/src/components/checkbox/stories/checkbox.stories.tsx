import { Meta, StoryObj } from '@storybook/vue3'
import { Checkbox, checkboxEmitters, checkboxProps } from '../Checkbox'
import { defineComponent, ref } from 'vue'
import { definePropType } from '../../../utils'
import cn from 'classnames'
import { myCheckboxFieldStyleVariants } from './example.css'
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
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
    label: 'label',
    caption: 'caption',
    disabled: false
  }
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      Checkbox,
    },
    setup() {
      const checked = ref(false)
      const handleCheck = (newValue: boolean) => checked.value = newValue
      return () => (
        <Checkbox
          label={args.label}
          caption={args.caption}
          value={checked.value}
          disabled={args.disabled}
          onChange={handleCheck}
        />
      )
    },
  }),
}

const MyCheckbox = defineComponent({
  name: 'MyCheckbox',
  components: { Checkbox },
  props: {
    size: {
      type: definePropType<'small' | 'medium' | 'large'>(String),
      default: 'medium'
    },
    ...checkboxProps
  },
  emits: checkboxEmitters,
  setup(props, { emit }) {
    return () => <Checkbox
      {...props}
      fieldStyle={cn(
        props.fieldStyle,
        myCheckboxFieldStyleVariants[props.size]
      )}
      onChange={(value) => emit('change', value)}
    />
  }
})

export const Composition: Story = {
  render: (args) => ({
    components: {
      MyCheckbox,
    },
    setup() {
      const checked = ref(false)
      const handleCheck = (newValue: boolean) => checked.value = newValue
      return () => (
        <MyCheckbox
          size='large'
          label={args.label}
          caption={args.caption}
          value={checked.value}
          disabled={args.disabled}
          onChange={handleCheck}
        />
      )
    },
  }),
}