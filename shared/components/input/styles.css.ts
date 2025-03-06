import { style, styleVariants } from "@vanilla-extract/css";

export const inputStyle = style({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  gap: '8px',
})

export const inputVariants = styleVariants({
  disabled: {
    cursor: 'not-allowed'
  },
  invalid: {},
  hover: {},
  focus: {},
  filled: {},
  small: {},
  medium: {},
  large: {}
})

export const inputLabelStyle = style({
  color: 'var(--neutral-700)',
})

export const inputLabelVariants = styleVariants({
  disabled: {
    color: 'var(--neutral-400)',
    pointerEvents: 'none'
  },
  hover: {
    color: 'var(--neutral-800)'
  },
  invalid: {},
  focus: {},
  filled: {},
  small: {
    fontSize: 'var(--font-sm)',
    padding: '0px 8px'
  },
  medium: {
    fontSize: 'var(--font-md)',
    padding: '0px 12px'
  },
  large: {
    fontSize: 'var(--font-lg)',
    padding: '0px 16px'
  }
})

export const inputFieldBoxStyle = style({
  display: 'flex',
  gap: '8px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px var(--zinc-400)',
  position: 'relative'
})

export const inputFieldBoxVariants = styleVariants({
  disabled: {
    boxShadow: 'none',
    border: '1px solid var(--zinc-200)',
    backgroundColor: 'var(--zinc-50)'
  },
  hover: {
    boxShadow: '0 1px 3px var(--zinc-400)',
  },
  focus: {
    boxShadow: '0 1px 2px var(--zinc-400)',
  },
  invalid: {},
  filled: {},
  small: {
    padding: '0px 8px',
    height: '28px'
  },
  medium: {
    padding: '0px 12px',
    height: '34px'
  },
  large: {
    padding: '0px 16px',
    height: '40px'
  }
})

export const inputFieldStyle = style({
  width: '100%',
  backgroundColor: 'transparent',
  border: '0',
  outline: 'none',
})

export const inputFieldVariants = styleVariants({
  disabled: {
    color: 'var(--neutral-400)',
    pointerEvents: 'none',
    '::placeholder': {
      color: 'var(--neutral-300)'
    }
  },
  hover: {},
  focus: {},
  filled: {},
  invalid: {},
  small: {
    fontSize: 'var(--font-sm)',
  },
  medium: {
    fontSize: 'var(--font-md)',
  },
  large: {
    fontSize: 'var(--font-lg)',
  }
})

export const inputPlaceholderStyle = style({
  color: 'var(--nautral-300)',
  pointerEvents: 'none',
  position: 'absolute',
  width: 'fit-content',
  height: 'fit-content',
  right: 'auto',
  top: 0,
  bottom: 0,
  margin: 'auto'
})

export const inputPlaceholderVariants = styleVariants({
  small: {
    fontSize: 'var(--font-sm)',
    padding: '0 1px'
  },
  medium: {
    fontSize: 'var(--font-md)',
    padding: '0 3px'
  },
  large: {
    fontSize: 'var(--font-lg)',
    padding: '0 5px'
  },
  invalid: {},
  hover: {},
  focus: {},
  filled: {
    opacity: 0
  },
  disabled: {
    opacity: 50
  }
})