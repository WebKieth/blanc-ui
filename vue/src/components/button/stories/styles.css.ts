import { style } from "@vanilla-extract/css";

export const rowStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px'
})

export const wrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '32px'
})

export const boxStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px'
})
