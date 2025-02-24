import { definePropType } from "../../utils";
import { computed, defineComponent, ExtractPublicPropTypes, provide, ref, watch } from "vue";
import { boxStyle } from "./styles.css";

import cn from 'classnames'
import { CalendarEmitters, CalendarLanguage, CalendarLocale, CalendarProvided, Month } from "./types";
import { CalendarHeader, calendarHeaderEmitters } from "./modules/CalendarHeader";
import { $calendarProvidedSymbol } from "./constants";
import { MONTHS } from "./_constants";
import { CALENDAR_LOCALES } from './locales'

import * as calendarHeaderStylingProps from './modules/CalendarHeader/stylingProps'
import * as calendarGridStylingProps from './modules/CalendarGrid/stylingProps'
import { CalendarGrid, calendarGridEmitters } from "./modules/CalendarGrid/CalendarGrid";
import { useWatchersForEmit } from "./hooks";


export const calendarStylingProps = {
  style: {
    type: String,
    default: boxStyle
  },
  ...calendarGridStylingProps,
  ...calendarHeaderStylingProps
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
  ...calendarStylingProps,
} as const

export type CalendarProps = ExtractPublicPropTypes<typeof calendarProps>

const calendarEmitters: CalendarEmitters = {
  ...calendarGridEmitters,
  ...calendarHeaderEmitters
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

    useWatchersForEmit({
      monthIndex: currentMonthIndex,
      year: currentYear
    }, emit)

    const day = computed(() => props.day)
    const month = computed(() => props.month)
    const year = computed(() => props.year)

    provide<CalendarProvided>($calendarProvidedSymbol, {
      language: props.language,
      customLocale: props.customLocale,
      currentMonthIndex,
      currentMonth,
      currentYear,
      handleNextYear,
      handlePrevYear,
      handleNextMonth,
      handlePrevMonth,
      day,
      month,
      year
    })

    return () => <div class={cn({[props.style]: props.style})}>
      {slots.header
        ? slots.header()
        : <CalendarHeader
            style={props.headerStyle}
            controlsStyle={props.headerControlsStyle}
            titlesStyle={props.headerTitlesStyle}
            monthTitleStyle={props.headerMonthTitleStyle}
            yearTitleStyle={props.headerYearTitleStyle}
            rewinderStyle={props.headerRewinderStyle}
            prevMonthIcon={props.prevMonthIcon}
            nextMonthIcon={props.nextMonthIcon}
            prevYearIcon={props.prevYearIcon}
            nextYearIcon={props.nextYearIcon}
          />
      }
      {slots.default
        ? slots.default()
        : <CalendarGrid
            style={props.gridStyle}
            rowStyle={props.gridRowStyle}
            weekdayCellStyle={props.gridWeekdayCellStyle}
            cellStyle={props.gridCellStyle}
            cellVariants={props.gridCellVariants}
            onDayClick={(...args) => emit('dayClick', ...args)}
          />
      }
    </div>
  }
})

export {
  CALENDAR_LOCALES
}
