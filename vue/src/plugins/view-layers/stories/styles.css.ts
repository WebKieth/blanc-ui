import { style } from "@vanilla-extract/css";


export const closeIconStyle = style({
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
})

export const dialogBoxStyle = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '320px',
  minHeight: '240px',
})

export const warningBoxStyle = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '420px',
})

export const modalHeaderStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  fontSize: '1.25rem',
  borderBottom: '1px solid var(--zinc-100)',
})

export const modalBodyStyle = style({
  padding: '12px 16px',
  fontSize: '0.875rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px'
})