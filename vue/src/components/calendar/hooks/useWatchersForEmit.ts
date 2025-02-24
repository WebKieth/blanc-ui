import { ComputedRef, watch } from "vue"
import { MonthEmitArg } from "../types"
import { MONTHS } from "../_constants"

type WatchProps = {
  monthIndex: ComputedRef<number>
  year: ComputedRef<number>
}

type EmitFn = ((event: "prevMonth", month: MonthEmitArg, prevMonth: MonthEmitArg) => void) & ((event: "nextMonth", month: MonthEmitArg, prevMonth: MonthEmitArg) => void) & ((event: "prevYear", year: number, prevYear: number) => void) & ((event: "nextYear", year: number, prevYear: number) => void)

export const useWatchersForEmit = (
  {monthIndex, year}: WatchProps,
  emit: EmitFn
) => {
  watch(monthIndex, (index, prevIndex) => {
    const key = MONTHS[index]
    const prevKey = MONTHS[prevIndex]
    if (index > prevIndex) {
      emit('nextMonth', { key, index }, { key: prevKey, index: prevIndex })
    } else if (index < prevIndex) {
      emit('prevMonth', { key, index }, { key: prevKey, index: prevIndex })
    }
  })

  watch(year, (year, prevYear) => {
    if (year > prevYear) {
      emit('nextYear', year, prevYear)
    } else if (year < prevYear) {
      emit('prevYear', year, prevYear)
    }
  })
}