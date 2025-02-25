import { style } from "@vanilla-extract/css";

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid var(--gray-200)'
})

export const headerTitleStyle = style({
  fontSize: '18px',
  fontWeight: '500'
})

export const headerButtonStyle = style({
  padding: '8px'
})