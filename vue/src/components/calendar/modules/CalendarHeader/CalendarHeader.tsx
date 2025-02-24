import { defineComponent, ExtractPublicPropTypes, inject } from "vue";
import {
  headerStyle,
  headerControlsStyle,
  headerTitlesStyle,
  headerMonthTitleStyle,
  headerRewinderStyle,
  prevMonthIcon,
  prevYearIcon,
  nextMonthIcon,
  nextYearIcon,
  headerYearTitleStyle
} from './stylingProps'
import cn from 'classnames'
import { Icon } from "../../../icon";
import { $calendarProvidedSymbol, defaultCalendarProvideInjected } from "../../constants";
import { CALENDAR_LOCALES } from "../../locales";
import { Month, MonthEmitArg } from "../../types";
import { useWatchersForEmit } from "../../hooks";

export const calendarHeaderStylingProps = {
  style: headerStyle,
  controlsStyle: headerControlsStyle,
  titlesStyle: headerTitlesStyle,
  monthTitleStyle: headerMonthTitleStyle,
  yearTitleStyle: headerYearTitleStyle,
  rewinderStyle: headerRewinderStyle,
  prevMonthIcon,
  prevYearIcon,
  nextMonthIcon,
  nextYearIcon
}

export const calendarHeaderProps = {
  ...calendarHeaderStylingProps,
} as const

export type CalendarHeaderProps = ExtractPublicPropTypes<typeof calendarHeaderProps>

export type CalenadarHeaderEmitters = {
  prevYear: (year: number, prevYear: number) => void
  nextYear: (year: number, prevYear: number) => void
  prevMonth: (month: MonthEmitArg, prevMonth: MonthEmitArg) => void
  nextMonth: (month: MonthEmitArg, prevMonth: MonthEmitArg) => void
}

export const calendarHeaderEmitters: CalenadarHeaderEmitters = {
  prevYear: (year, prevYear) => typeof year === 'number' && typeof prevYear === 'number',
  nextYear: (year, prevYear) => typeof year === 'number' && typeof prevYear === 'number',
  prevMonth: (month, prevMonth) => typeof month.index === 'number' && typeof month.key === 'string' && typeof prevMonth.index === 'number' && typeof prevMonth.key === 'string',
  nextMonth: (month, prevMonth) => typeof month.index === 'number' && typeof month.key === 'string' && typeof prevMonth.index === 'number' && typeof prevMonth.key === 'string'
}

export const CalendarHeader = defineComponent({
  name: 'CalendarHeader',
  props: calendarHeaderProps,
  emits: calendarHeaderEmitters,
  setup(props, { slots, emit }) {
    const {
      language,
      customLocale,
      currentMonth,
      currentMonthIndex,
      currentYear,
      handleNextYear,
      handlePrevYear,
      handleNextMonth,
      handlePrevMonth
    } = inject($calendarProvidedSymbol, defaultCalendarProvideInjected)

    const getMonthLocale = (month: Month, short: boolean = false) => (
      customLocale
        ? customLocale.months[short ? 'short' : 'full'][month]
        : CALENDAR_LOCALES[language].months[short ? 'short' : 'full'][month]
    )

    useWatchersForEmit({ monthIndex: currentMonthIndex, year: currentYear }, emit)

    return () => (
      <div class={cn({[props.style]: props.style})}>
        {slots.prevControls
          ? slots.prevControls({ handlePrevYear, handlePrevMonth })
          : <div class={cn({[props.controlsStyle]: props.controlsStyle})}>
              <div
                class={cn({[props.rewinderStyle]: props.rewinderStyle})}
                onClick={() => handlePrevYear()}
              >
                <Icon name={props.prevYearIcon} />
              </div>
              <div
                class={cn({[props.rewinderStyle]: props.rewinderStyle})}
                onClick={() => handlePrevMonth()}
              >
                <Icon name={props.prevMonthIcon} />
              </div>
            </div>
        }
        {slots.titles
          ? slots.titles({ currentMonth, currentYear })
          : <div class={cn({[props.titlesStyle]: props.titlesStyle})}>
              <div class={cn({[props.monthTitleStyle]: props.monthTitleStyle})}>
                {getMonthLocale(currentMonth.value)}
              </div>
              <div class={cn({[props.yearTitleStyle]: props.yearTitleStyle})}>
                {currentYear.value}
              </div>
            </div>
        }
        {slots.nextControls
          ? slots.nextControls({ handleNextMonth, handleNextYear })
          : <div class={cn({[props.controlsStyle]: props.controlsStyle})}>
              <div
                class={cn({[props.rewinderStyle]: props.rewinderStyle})}
                onClick={() => handleNextMonth()}
              >
                <Icon name={props.nextMonthIcon} />
              </div>
              <div
                class={cn({[props.rewinderStyle]: props.rewinderStyle})}
                onClick={() => handleNextYear()}
              >
                <Icon name={props.nextYearIcon} />
              </div>
            </div>
        }
      </div>
    )
  }
})