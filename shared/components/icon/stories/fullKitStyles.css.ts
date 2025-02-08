import { style } from "@vanilla-extract/css";


export const wrapperStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px'
})

export const boxStyle = style({
  width: '10%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '12px',
  gap: '8px'
})

export const labelStyle = style({
  fontSize: '12px',
  textAlign: 'center'
})