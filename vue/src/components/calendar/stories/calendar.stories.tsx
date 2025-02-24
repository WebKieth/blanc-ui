import { Meta, StoryObj } from "@storybook/vue3";
import { Calendar } from "../Calendar";
import { MONTHS } from "../_constants";
import { Month } from "../types";
import { ref } from "vue";
import { CalendarHeader } from "../modules/CalendarHeader";
import { CalendarGrid } from "../modules/CalendarGrid";

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
      const month = ref<Month>(args.month || MONTHS[new Date().getMonth()])
      const year = ref<number>(args.year || new Date().getFullYear())
      const day = ref<number>(args.day || new Date().getDate())

      const handleChangeDay = (_day: number, _month: Month, _year: number) => {
        day.value = _day
        year.value = _year
        month.value = _month
        console.log(day.value, year.value, month.value)
      }

      return () => <Calendar
        language={args.language}
        month={month.value}
        year={year.value}
        day={day.value}
        onDayClick={(_, day, __, month, year) => handleChangeDay(day, month, year)}
      />
    }
  })
}

export const SlotRender: Story = {
  render: (args) => ({
    components: { Calendar, CalendarHeader, CalendarGrid },
    setup() {
      const month = ref<Month>(args.month || MONTHS[new Date().getMonth()])
      const year = ref<number>(args.year || new Date().getFullYear())
      const day = ref<number>(args.day || new Date().getDate())

      const handleChangeDay = (_day: number, _month: Month, _year: number) => {
        day.value = _day
        year.value = _year
        month.value = _month
        console.log(day.value, year.value, month.value)
      }

      return () => <Calendar
        language={args.language}
        month={month.value}
        year={year.value}
        day={day.value}
      >
        {{
          header: () => <CalendarHeader />,
          default: () => (
            <CalendarGrid
              onDayClick={(_, day, __, month, year) => handleChangeDay(day, month, year)}
            />
          )
        }}
      </Calendar>
    }
  })
}