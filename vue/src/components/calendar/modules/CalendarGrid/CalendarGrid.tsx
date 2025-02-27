import { computed, defineComponent, ExtractPublicPropTypes, inject } from "vue";
import cn from 'classnames'
import { MONTHS, ROWS_LENGTH, WEEKDAYS } from "../../_constants";
import { CalendarCell, Month, Weekday } from "../../types";
import { gridCellStyle, gridCellVariants, gridRowStyle, gridStyle, gridWeekdayCellStyle } from "./stylingProps";
import { $calendarProvidedSymbol, defaultCalendarProvideInjected } from "../../constants";
import { CALENDAR_LOCALES } from "../../locales";

export const calendarGridProps = {
  style: gridStyle,
  rowStyle: gridRowStyle,
  weekdayCellStyle: gridWeekdayCellStyle,
  cellStyle: gridCellStyle,
  cellVariants: gridCellVariants
} as const

export type CalendarGridProps = ExtractPublicPropTypes<typeof calendarGridProps>

export type CalendarGridEmitters = {
  dayClick: (event: MouseEvent, day: number, weekday: Weekday, month: Month, year: number, today: boolean) => void
}

export const calendarGridEmitters: CalendarGridEmitters = {
  dayClick: (e) => e?.type === 'click'
}

export const CalendarGrid = defineComponent({
  name: 'CalendarGrid',
  props: calendarGridProps,
  emits: calendarGridEmitters,
  setup(props, { slots, emit }) {
    const {
      currentMonthIndex,
      currentMonth,
      currentYear,
      customLocale,
      language,
      day,
      month,
      year
    } = inject($calendarProvidedSymbol, defaultCalendarProvideInjected)
    const isToday = (date: number, monthIndex: number, year: number) => {
      const d = new Date()
      return (
        date === d.getDate() &&
        monthIndex === d.getMonth() &&
        year === d.getFullYear()
      )
    }

    const handleDayClick = (e: MouseEvent, cell: CalendarCell) => {
      const month = cell.prevMonth
        ? MONTHS[currentMonthIndex.value - 1]
        : cell.nextMonth
          ? MONTHS[currentMonthIndex.value + 1]
          : currentMonth.value
      emit('dayClick', e, cell.date, cell.weekday, month, currentYear.value, cell.today)
    }

    const isChoosen = (cell: CalendarCell) => {
      const monthIndex = MONTHS.findIndex((m) => m === month.value)
      const actualMonthIndex = cell.prevMonth
        ? monthIndex - 1
        : cell.nextMonth
          ? monthIndex + 1
          : monthIndex

      return (
        cell.date === day.value &&
        currentMonthIndex.value === actualMonthIndex &&
        currentYear.value === year.value
      )
    }
    
    const getWeekdayLocale = (weekday: Weekday, short: boolean = false) => (
      customLocale
        ? customLocale.weekdays[short ? 'short' : 'full'][weekday]
        : CALENDAR_LOCALES[language].weekdays[short ? 'short' : 'full'][weekday]
    )
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
          const todayMonthIndex = cell.prevMonth
            ? currentMonthIndex.value === 0
              ? 11
              : currentMonthIndex.value - 1
            : cell.nextMonth
              ? currentMonthIndex.value === 11
                ? 0
                :currentMonthIndex.value + 1
              : currentMonthIndex.value
          const todayYear = cell.prevMonth && currentMonthIndex.value === 0
            ? currentYear.value - 1
            : cell.nextMonth && currentMonthIndex.value === 11
              ? currentYear.value + 1
              : currentYear.value
          cell.today = isToday(
            cell.date,
            todayMonthIndex,
            todayYear
          )
          cell.weekday = WEEKDAYS[wdIndex]
          row.push(cell)
        }
        rows.push(row)
      }
      return rows
    })

    return () => (
      <div class={props.style}>
        {slots.weekdays
          ? slots.weekdays()
          : <div class={props.rowStyle}>
              {WEEKDAYS.map((weekday) => (
                <div class={props.weekdayCellStyle} key={weekday}>
                  {getWeekdayLocale(weekday, true)}
                </div>
              ))}
            </div>
        }
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
                {slots.default
                  ? slots.default(cell)
                  : cell.date
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
})