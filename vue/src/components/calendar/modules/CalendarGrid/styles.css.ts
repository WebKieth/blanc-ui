import { style, styleVariants } from "@vanilla-extract/css";

export const gridStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
})

export const rowStyle = style({
  display: 'flex',
  gap: '2px'
})

export const baseCellStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
})

export const weekdayCellStyle = style([
  baseCellStyle,
  {
    color: 'var(--gray-500)'
  }
])

export const cellStyle = style([
  baseCellStyle,
  {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--slate-100)'
    }
  }
])

export const cellVariants = styleVariants({
  prevMonth: {
    color: 'var(--gray-400)'
  },
  nextMonth: {
    color: 'var(--gray-400)'
  },
  today: {
    backgroundColor: 'var(--blue-500)',
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--blue-600)',
    }
  },
  choosen: {
    backgroundColor: 'var(--gray-300)',
    color: 'var(--gray-700)',
    ':hover': {
      backgroundColor: 'var(--gray-400)',
      color: 'var(--gray-800)',
    }
  }
})