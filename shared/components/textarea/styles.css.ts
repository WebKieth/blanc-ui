import { style, styleVariants } from "@vanilla-extract/css";

export const textareaStyle = style({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  gap: '8px',
})

export const textareaVariants = styleVariants({
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

export const textareaLabelStyle = style({
  color: 'var(--neutral-700)',
  display: 'flex',
  alignItems: 'center',
})

export const textareaLabelVariants = styleVariants({
  disabled: {
    color: 'var(--neutral-400)',
    pointerEvents: 'none'
  },
  invalid: {},
  hover: {
    color: 'var(--neutral-800)'
  },
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

export const textareaFieldBoxStyle = style({
  display: 'flex',
  gap: '8px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px var(--zinc-400)',
  position: 'relative',
  minWidth: '100px'
})

export const textareaFieldBoxVariants = styleVariants({
  disabled: {
    boxShadow: 'none',
    border: '1px solid var(--zinc-200)',
    backgroundColor: 'var(--zinc-50)'
  },
  invalid: {},
  hover: {
    boxShadow: '0 1px 3px var(--zinc-400)',
  },
  focus: {
    boxShadow: '0 1px 2px var(--zinc-400)',
  },
  filled: {},
  small: {
    minHeight: '60px',
  },
  medium: {
    minHeight: '80px'
  },
  large: {
    minHeight: '100px'
  }
})

export const textareaFieldStyle = style({
  width: '100%',
  backgroundColor: 'transparent',
  border: '0',
  outline: 'none',
  fontFamily: 'sans-serif',
  minWidth: '100px'
})

export const textareaFieldVariants = styleVariants({
  disabled: {
    color: 'var(--neutral-400)',
    pointerEvents: 'none',
    '::placeholder': {
      color: 'var(--neutral-300)'
    }
  },
  invalid: {},
  hover: {},
  focus: {},
  filled: {},
  small: {
    fontSize: 'var(--font-sm)',
    minHeight: '60px',
    padding: '2px 4px'
  },
  medium: {
    fontSize: 'var(--font-md)',
    minHeight: '80px',
    padding: '6px 10px'
  },
  large: {
    fontSize: 'var(--font-lg)',
    minHeight: '100px',
    padding: '10px 16px'
  }
})

export const textareaPlaceholderStyle = style({
  color: 'var(--nautral-300)',
  pointerEvents: 'none',
  position: 'absolute',
  width: 'fit-content',
  height: 'fit-content',
  right: 'auto',
  top: 0,
  margin: 'auto',
})

export const textareaPlaceholderVariants = styleVariants({
  small: {
    fontSize: 'var(--font-sm)',
    padding: '2px 4px'
  },
  medium: {
    fontSize: 'var(--font-md)',
    padding: '6px 10px'
  },
  large: {
    fontSize: 'var(--font-lg)',
    padding: '10px 16px'
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

export const textareaCaptionStyle = style({
  color: 'var(--neutral-700)',

})

export const textareaCaptionVariants = styleVariants({
  small: {
    fontSize: 'var(--font-xs)'
  },
  medium: {
    fontSize: 'var(--font-sm)'
  },
  large: {
    fontSize: 'var(--font-md)'
  },
  hover: {},
  focus: {},
  filled: {},
  disabled: {
    color: 'var(--neutral-400)'
  },
  invalid: {
    color: 'var(--red-600)'
  }
})