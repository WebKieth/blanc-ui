import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '..'
import { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium', 'large'],
      default: 'medium'
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

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(false)
    return <Checkbox
      label={args.label}
      caption={args.caption}
      value={value}
      size={args.size}
      disabled={args.disabled}
      onChange={setValue}
    />
  }
}