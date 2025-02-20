export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'| 'Friday' | 'Saturday'| 'Sunday'

export type CalendarEmitters = {
  dayClick: (event: MouseEvent, day: number, weekday: Weekday, month: Month, year: number, today: boolean) => void
}