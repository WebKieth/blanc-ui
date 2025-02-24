import { style } from "@vanilla-extract/css";

export const headerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4px'
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
  width: '70%',
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

export const yearTitleStyle = style({
  width: '30%'
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