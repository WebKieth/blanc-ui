import { Meta, StoryObj } from "@storybook/vue3";
import { Calendar } from "../Calendar";

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      return () => <Calendar />
    }
  })
}