import { style, styleVariants } from "@vanilla-extract/css";

export const spoilerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  border: '1px solid var(--gray-300)'
})

export const spoilerVariants = styleVariants({
  small: {},
  medium: {},
  large: {},
  disabled: {
    cursor: 'not-allowed',
    color: 'var(--gray-500)'
  },
  opened: {},
  first: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: 0
  },
  middle: {
    borderRadius: 0,
    borderBottom: 0
  },
  last: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  }
})

export const spoilerHeaderStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export const spoilerHeaderVariants = styleVariants({
  small: {
    padding: '8px 12px'
  },
  medium: {
    padding: '12px 16px'
  },
  large: {
    padding: '18px 24px'
  },
  disabled: {},
  opened: {
    borderBottom: '1px solid var(--gray-300)'
  }
})

export const spoilerTitleStyle = style({
  fontWeight: '500'
})

export const spoilerTitleVariants = styleVariants({
  small: {
    fontSize: 'var(--font-md)'
  },
  medium: {
    fontSize: 'var(--font-lg)'
  },
  large: {
    fontSize: 'var(--font-xl)'
  },
  disabled: {},
  opened: {}
})

export const spoilerContentStyle = style({
  fontWeight: '400',
  display: 'none'
})

export const spoilerContentVariants = styleVariants({
  small: {
    fontSize: 'var(--font-sm)',
    padding: '8px 12px'
  },
  medium: {
    fontSize: 'var(--font-md)',
    padding: '12px 16px'
  },
  large: {
    fontSize: 'var(--font-lg)',
    padding: '18px 24px'
  },
  disabled: {},
  opened: {
    display: 'block'
  }
})