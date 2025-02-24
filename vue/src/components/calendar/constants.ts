import { computed } from "vue"
import { CalendarProvided } from "./types"
import { MONTHS } from "./_constants"

const defaultMonth = MONTHS[0]
const defaultYear = new Date().getFullYear()

export const $calendarProvidedSymbol = Symbol('calendar-provided')

export const defaultCalendarProvideInjected: CalendarProvided = {
  language: 'ru',
  customLocale: null,
  currentMonthIndex: computed(() => 0),
  currentMonth: computed(() => defaultMonth),
  currentYear: computed(() => defaultYear),
  day: computed(() => 1),
  month: computed(() => defaultMonth),
  year: computed(() => defaultYear),
  handleNextYear: () => {},
  handlePrevYear: () => {},
  handleNextMonth: () => {},
  handlePrevMonth: () => {}
}