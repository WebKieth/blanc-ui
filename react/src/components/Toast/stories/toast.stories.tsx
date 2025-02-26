import { Meta, StoryObj } from "@storybook/react";
import { Toast } from "../Toast";

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      default: 'medium', 
    },
    iconName: {
      control: {
        type: 'text',
      },
      default: '', 
    },
    closeIconName: {
      control: {
        type: 'text',
      },
      default: 'ri-close-line', 
    },
    title: {
      control: {
        type: 'text'
      },
    },
    message: {
      control: {
        type: 'text'
      },
    }
  },
  args: {
    title: 'title',
    message: 'message content text',
    size: 'medium',
    iconName: 'ri-message-line',
    closeIconName: 'ri-close-line'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render(args) {
    return (
      <Toast
      size={args.size}
      iconName={args.iconName}
      title={args.title}
      message={args.message}
      closeIconName={args.closeIconName}
      />
    )
  }
}