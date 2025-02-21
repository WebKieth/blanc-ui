export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'| 'Friday' | 'Saturday'| 'Sunday'

export type CalendarEmitters = {
  dayClick: (event: MouseEvent, day: number, weekday: Weekday, month: Month, year: number, today: boolean) => void
}

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