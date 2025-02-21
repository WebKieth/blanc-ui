import { definePropType } from "../../utils";
import { computed, defineComponent, ExtractPublicPropTypes, ref, watch } from "vue";
import { bodyStyle, boxStyle, cellStyle, cellVariants, controlsStyle, headerStyle, monthTitleStyle, rewinderStyle, rowStyle, titlesStyle, weekdayCellStyle } from "./styles.css";
import { Icon } from "../icon";
import cn from 'classnames'
import { CalendarCell, CalendarEmitters, CalendarLanguage, CalendarLocale, Month, Weekday } from "./types";
import { MONTHS, ROWS_LENGTH, WEEKDAYS } from "./constants";
import { CALENDAR_LOCALES } from './locales'

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
  day: {
    type: definePropType<number>(Number),
    default: new Date().getDate()
  },
  month: {
    type: definePropType<Month>(String),
    default: MONTHS[new Date().getMonth()]
  },
  year: {
    type: definePropType<number>(Number),
    default: new Date().getFullYear()
  },
  customLocale: {
    type: definePropType<CalendarLocale | null>(null),
    default: null
  },
  language: {
    type: definePropType<CalendarLanguage>(String),
    default: 'en'
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
    const handleDayClick = (e: MouseEvent, cell: CalendarCell) => {
      const month = cell.prevMonth
        ? MONTHS[currentMonthIndex.value - 1]
        : cell.nextMonth
          ? MONTHS[currentMonthIndex.value + 1]
          : currentMonth.value
      emit('dayClick', e, cell.date, cell.weekday, month, currentYear.value, cell.today)
    }
    const isToday = (date: number, monthIndex: number, year: number) => {
      const d = new Date()
      return (
        date === d.getDate() &&
        monthIndex === d.getMonth() &&
        year === d.getFullYear()
      )
    }
    const isChoosen = (cell: CalendarCell) => {
      const monthIndex = MONTHS.findIndex((m) => m === props.month)
      const actualMonthIndex = cell.prevMonth
        ? monthIndex - 1
        : cell.nextMonth
          ? monthIndex + 1
          : monthIndex
      return (
        cell.date === props.day &&
        currentMonthIndex.value === actualMonthIndex &&
        currentYear.value === props.year
      )
    }
    const daysGrid = computed(() => {
      const daysInPrevMonth = new Date(currentYear.value, currentMonthIndex.value, 0).getDate()
      const daysInCurrentMonth = new Date(currentYear.value, currentMonthIndex.value + 1, 0).getDate()
      const startDay = new Date(currentYear.value, currentMonthIndex.value, 1).getDay()
      const rows = []
      for (let rowIndex = 0; rowIndex < ROWS_LENGTH; rowIndex++) {
        const row = []
        for(let wdIndex = 0; wdIndex < WEEKDAYS.length; wdIndex++) {
          const wdNum = wdIndex + 1
          const i = (rowIndex * WEEKDAYS.length) + wdNum
          const cell: CalendarCell = {
            date: 0,
            prevMonth: false,
            nextMonth: false,
            today: false,
            weekday: WEEKDAYS[0]
          }
          if (i < startDay) {
            cell.date = daysInPrevMonth - startDay + i + 1
            cell.prevMonth = true
          } else if (i > daysInCurrentMonth + startDay - 1) {
            cell.date =  (i - daysInCurrentMonth - startDay) + 1
            cell.nextMonth = true
          } else {
            cell.date = (i - startDay) + 1
          }
          cell.today = isToday(cell.date, currentMonthIndex.value, currentYear.value)
          cell.weekday = WEEKDAYS[wdIndex]
          row.push(cell)
        }
        rows.push(row)
      }
      return rows
    })

    const getMonthLocale = (month: Month, short: boolean = false) => (
      props.customLocale
        ? props.customLocale.months[short ? 'short' : 'full'][month]
        : CALENDAR_LOCALES[props.language].months[short ? 'short' : 'full'][month]
    )

    const getWeekdayLocale = (weekday: Weekday, short: boolean = false) => (
      props.customLocale
        ? props.customLocale.weekdays[short ? 'short' : 'full'][weekday]
        : CALENDAR_LOCALES[props.language].weekdays[short ? 'short' : 'full'][weekday]
    )

    return () => <div class={props.style}>
      <div class={props.headerStyle}>
        {slots.header
          ? slots.header({
            month: {
              full: getMonthLocale(currentMonth.value),
              short: getMonthLocale(currentMonth.value, true)
            },
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
                {getMonthLocale(currentMonth.value)}
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
              {getWeekdayLocale(weekday, true)}
            </div>
          ))}
        </div>
        {daysGrid.value.map((row, index) => (
          <div class={props.rowStyle} key={index}>
            {row.map((cell) => (
              <div
                class={cn({
                  [props.cellStyle]: props.cellStyle,
                  [props.cellVariants.prevMonth]: props.cellVariants.prevMonth && cell.prevMonth,
                  [props.cellVariants.nextMonth]: props.cellVariants.nextMonth && cell.nextMonth,
                  [props.cellVariants.today]: props.cellVariants.today && cell.today,
                  [props.cellVariants.choosen]: props.cellVariants.choosen && isChoosen(cell)
                })}
                key={cell.weekday}
                onClick={(e) => handleDayClick(e, cell)}
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

export {
  CALENDAR_LOCALES
}
