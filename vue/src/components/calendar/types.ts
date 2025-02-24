import { ComputedRef } from "vue"
import { CalendarGridEmitters } from "./modules/CalendarGrid/CalendarGrid"
import { CalenadarHeaderEmitters } from "./modules/CalendarHeader"

export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'| 'Friday' | 'Saturday'| 'Sunday'

export type CalendarEmitters = {}
  & CalendarGridEmitters
  & CalenadarHeaderEmitters

export type CalendarLanguage = 'ru' | 'en'

export type CalendarLocale = {
  months: {
    full: Record<Month, string>,
    short: Record<Month, string>
  }
  weekdays: {
    full: Record<Weekday, string>
    short: Record<Weekday, string>
  }
}

export type CalendarLocales = Record<CalendarLanguage, CalendarLocale>

export type CalendarCell = {
  date: number
  prevMonth: boolean
  nextMonth: boolean
  weekday: Weekday
  today: boolean
}

export type CalendarProvided = {
  language: CalendarLanguage
  customLocale: CalendarLocale | null
  currentMonthIndex: ComputedRef<number>
  currentMonth: ComputedRef<Month>
  currentYear: ComputedRef<number>
  day: ComputedRef<number>
  month: ComputedRef<Month>
  year: ComputedRef<number>
  handlePrevYear: () => void
  handleNextYear: () => void
  handlePrevMonth: () => void
  handleNextMonth: () => void
}

export type MonthEmitArg = {
  key: Month,
  index: number
}