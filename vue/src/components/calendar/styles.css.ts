import { style, styleVariants } from "@vanilla-extract/css";

export const boxStyle = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '236px',
  border: '1px solid var(--gray-300)'
})

export const headerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4px'
})

export const bodyStyle = style({
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
  prev: {
    color: 'var(--gray-400)'
  },
  next: {
    color: 'var(--gray-400)'
  },
  today: {
    backgroundColor: 'var(--blue-500)',
    color: 'white',
    ':hover': {
      backgroundColor: 'var(--blue-600)',
    }
  }
})

export const controlsStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px'
})

export const titlesStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
})

export const monthTitleStyle = style({
  width: '70px',
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

export const rewinderStyle = style({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'var(--stone-200)'
  }
})