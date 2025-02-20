import { definePropType } from "../../utils";
import { computed, defineComponent, ExtractPublicPropTypes, ref, watch } from "vue";
import { bodyStyle, boxStyle, cellStyle, cellVariants, controlsStyle, headerStyle, monthTitleStyle, rewinderStyle, rowStyle, titlesStyle, weekdayCellStyle } from "./styles.css";
import { Icon } from "../icon";
import cn from 'classnames'
import { CalendarEmitters, Month, Weekday } from "./types";

const MONTHS: Month[] = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const WEEKDAYS: Weekday[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

const ROWS_LENGTH = 6

export const calendarStylingProps = {
  style: {
    type: String,
    default: boxStyle
  },
  headerStyle: {
    type: String,
    default: headerStyle
  },
  bodyStyle: {
    type: String,
    default: bodyStyle
  },
  rowStyle: {
    type: String,
    default: rowStyle
  },
  weekdayCellStyle: {
    type: String,
    default: weekdayCellStyle
  },
  cellStyle: {
    type: String,
    default: cellStyle
  },
  cellVariants: {
    type: Object,
    default: cellVariants
  },
  controlsStyle: {
    type: String,
    default: controlsStyle
  },
  titlesStyle: {
    type: String,
    default: titlesStyle
  },
  monthTitleStyle: {
    type: String,
    default: monthTitleStyle
  },
  rewinderStyle: {
    type: String,
    default: rewinderStyle
  }
}

export const calendarProps = {
  month: {
    type: definePropType<Month>(String),
    default: MONTHS[new Date().getMonth()]
  },
  year: {
    type: definePropType<number>(Number),
    default: new Date().getFullYear()
  },
  ...calendarStylingProps
} as const

export type CalendarProps = ExtractPublicPropTypes<typeof calendarProps>


const calendarEmitters: CalendarEmitters = {
  dayClick: (e) => e?.type === 'click'
}

export const Calendar = defineComponent({
  name: 'Calendar',
  props: calendarProps,
  emits: calendarEmitters,
  setup(props, { slots, emit }) {
    const monthDiff = ref(0)
    const yearDiff = ref(0)
    watch(() => props.month, () => monthDiff.value = 0)
    watch(() => props.year, () => yearDiff.value = 0)
    const currentMonthIndex = computed(() => {
      const monthIndex = MONTHS.findIndex((m) => m === props.month)
      return monthIndex + monthDiff.value
    })
    const currentMonth = computed(() => {
      if (currentMonthIndex.value < 0) {
        return MONTHS[MONTHS.length + currentMonthIndex.value]
      } else if (currentMonthIndex.value > MONTHS.length) {
        return MONTHS[currentMonthIndex.value - MONTHS.length]
      } else return MONTHS[currentMonthIndex.value]
    })
    const currentYear = computed(() => props.year + yearDiff.value)
    const handlePrevYear = () => {
      yearDiff.value = yearDiff.value - 1
    }
    const handleNextYear = () => {
      yearDiff.value = yearDiff.value + 1
    }
    const handlePrevMonth = () => {
      if ((currentMonthIndex.value - 1) < 0) {
        handlePrevYear()
        monthDiff.value = monthDiff.value + MONTHS.length - 1
        return
      }
      monthDiff.value = monthDiff.value - 1
    }
    const handleNextMonth = () => {
      if ((currentMonthIndex.value + 1) > MONTHS.length - 1) {
        handleNextYear()
        monthDiff.value = monthDiff.value - MONTHS.length + 1
        return
      }
      monthDiff.value = monthDiff.value + 1
    }
    const handleDayClick = (e: MouseEvent, date: number, weekday: Weekday, today: boolean) => {
      emit('dayClick', e, date, weekday, currentMonth.value, currentYear.value, today)
    }
    const daysGrid = computed(() => {
      const daysInPrevMonth = new Date(currentYear.value, currentMonthIndex.value, 0).getDate()
      const daysInCurrentMonth = new Date(currentYear.value, currentMonthIndex.value + 1, 0).getDate()
      const startDay = new Date(currentYear.value, currentMonthIndex.value, 1).getDay()
      const today = new Date()
      const dayNow = today.getDate()
      const wDayNow = today.getDay()
      const monthNow = today.getMonth()
      const yearNow = today.getFullYear()

      const rows = []
      for (let rowIndex = 0; rowIndex < ROWS_LENGTH; rowIndex++) {
        const row = []
        for(let wdIndex = 0; wdIndex < WEEKDAYS.length; wdIndex++) {
          const wdNum = wdIndex + 1
          const i = (rowIndex * WEEKDAYS.length) + wdNum
          const cell = { date: 0, prev: false, next: false, today: false }
          if (i < startDay) {
            cell.date = daysInPrevMonth - startDay + i + 1
            cell.prev = true
          } else if (i > daysInCurrentMonth + startDay - 1) {
            cell.date =  (i - daysInCurrentMonth - startDay) + 1
            cell.next = true
          } else {
            cell.date = (i - startDay) + 1
          }
          cell.today = (
            currentMonthIndex.value === monthNow &&
            currentYear.value === yearNow &&
            cell.date === dayNow &&
            wdIndex === wDayNow - 1
          )
          row.push({
            weekday: WEEKDAYS[wdIndex],
            ...cell
          })
        }
        rows.push(row)
      }
      return rows
    })

    return () => <div class={props.style}>
      <div class={props.headerStyle}>
        {slots.header
          ? slots.header({
            month: currentMonth.value,
            year: currentYear.value,
            handlePrevMonth,
            handlePrevYear,
            handleNextMonth,
            handleNextYear
          })
          : <>
            <div class={props.controlsStyle}>
              <div
                class={props.rewinderStyle}
                onClick={() => handlePrevYear()}
              >
                <Icon name='ri-arrow-left-line' />
              </div>
              <div
                class={props.rewinderStyle}
                onClick={() => handlePrevMonth()}
              >
                <Icon name='ri-arrow-left-s-line' />
              </div>
            </div>
            <div class={props.titlesStyle}>
              <div class={props.monthTitleStyle}>
                {currentMonth.value}
              </div>
              <div>
                {currentYear.value}
              </div>
            </div>
            <div class={props.controlsStyle}>
              <div
                class={props.rewinderStyle}
                onClick={() => handleNextMonth()}
              >
                <Icon name='ri-arrow-right-s-line' />
              </div>
              <div
                class={props.rewinderStyle}
                onClick={() => handleNextYear()}
              >
                <Icon name='ri-arrow-right-line' />
              </div>
            </div>
          </>
        }
      </div>
      <div class={props.bodyStyle}>
        <div class={props.rowStyle}>
          {WEEKDAYS.map((weekday) => (
            <div class={props.weekdayCellStyle} key={weekday}>
              {weekday.substring(0, 2)}
            </div>
          ))}
        </div>
        {daysGrid.value.map((row, index) => (
          <div class={props.rowStyle} key={index}>
            {row.map((cell) => (
              <div
                class={cn({
                  [props.cellStyle]: props.cellStyle,
                  [props.cellVariants.prev]: props.cellVariants.prev && cell.prev,
                  [props.cellVariants.next]: props.cellVariants.next && cell.next,
                  [props.cellVariants.today]: props.cellVariants.today && cell.today
                })}
                key={cell.weekday}
                onClick={(e) => handleDayClick(e, cell.date, cell.weekday, cell.today)}
              >
                {cell.date}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  }
})