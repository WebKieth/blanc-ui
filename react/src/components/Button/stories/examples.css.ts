import { styleVariants } from "@vanilla-extract/css";

export const myButtonStyleVariants = styleVariants({
  small: {
    fontSize: '14px',
    padding: '5px 8px'
  },
  medium: {
    padding: '8px 12px',
  },
  large: {
    fontSize: '18px',
    padding: '10 14px',
  },
  primary: {
    backgroundColor: 'var(--blue-500)',
    color: 'white',
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: 'var(--blue-600)',
        color: 'white',
      },
      '&:not(:disabled):active': {
        backgroundColor: 'var(--blue-700)',
        color: 'white',
      }
    }
  },
  secondary: {
    backgroundColor: 'var(--neutral-200)',
    color: 'var(--neutral-600)',
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: 'var(--neutral-300)',
        color: 'var(--neutral-700)',
      },
      '&:not(:disabled):active': {
        backgroundColor: 'var(--neutral-400)',
        color: 'var(--neutral-800)',
      }
    }
  },
  rounded: {
    borderRadius: '99px'
  }
})