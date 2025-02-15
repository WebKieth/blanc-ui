import { style, styleVariants } from "@vanilla-extract/css";

export const tableFooterStyle = style({
  
  borderTop: '1px solid var(--zinc-200)',
  borderBottom: '1px solid var(--zinc-200)',
  backgroundColor: 'var(--slate-50)'
})

export const tableFooterVariants = styleVariants({
  small: {
    padding: '8px 10px',
    fontSize: 'var(--font-xs)',
  },
  medium: {
    padding: '10px 12px',
    fontSize: 'var(--font-sm)',
  },
  large: {
    padding: '12px 14px',
    fontSize: 'var(--font-base)',
  }
})