import { style } from "@vanilla-extract/css";

export const bodyStyle = style({
  display: 'flex',
  gap: '12px',
  padding: '12px 16px',
})

export const bodyIconStyle = style({
  flexShrink: '1'
})

export const bodyContentStyle = style({
  flexGrow: '1'
})