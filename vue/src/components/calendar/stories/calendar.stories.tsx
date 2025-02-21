import { Meta, StoryObj } from "@storybook/vue3";
import { Calendar } from "../Calendar";
import { MONTHS } from "../constants";

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: {
        type: 'select'
      },
      options: ['ru', 'en'],
      default: 'en'
    },
    year: {
      control: {
        type: 'range',
        min: 1970,
        max: 2100,
        step: 1
      },
      default:  new Date().getFullYear()
    },
    month: {
      control: {
        type: 'select'
      },
      options: MONTHS,
      default: MONTHS[new Date().getMonth()]
    },
    day: {
      control: {
        type: 'range',
        min: 1,
        max: 31,
        step: 1
      },
      default: new Date().getDate()
    }
  },
  args: {
    year: new Date().getFullYear(),
    month: MONTHS[new Date().getMonth()],
    day: new Date().getDate(),
    language: 'en'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      return () => <Calendar
        language={args.language}
        month={args.month}
        year={args.year}
        day={args.day}
      />
    }
  })
}