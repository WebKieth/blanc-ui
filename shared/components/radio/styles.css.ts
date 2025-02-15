import { style, styleVariants } from "@vanilla-extract/css"

const radioFieldSizes = {
  small: {
    width: '16px',
    height: '16px',
  },
  medium: {
    width: '20px',
    height: '20px',
  },
  large: {
    width: '24px',
    height: '24px',
  }
}

const radioDotSizes = {
  small: {
    width: '8px',
    height: '8px',
  },
  medium: {
    width: '10px',
    height: '10px',
  },
  large: {
    width: '12px',
    height: '12px',
  }
}

export const radioStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
})


export const radioFieldStyle = style({
  borderRadius: '99px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

export const radioFieldVariants = styleVariants({
  unchecked: {
    border: '1px solid var(--teal-600)',
    backgroundColor: 'var(--teal-50)',
    ':hover': {
      border: '1px solid var(--teal-700)',
      backgroundColor: 'var(--teal-100)',
    }
  },
  checked: {
    backgroundColor: 'var(--sky-50)',
    border: '1px solid var(--sky-600)',
    ':hover': {
      backgroundColor: 'var(--sky-100)',
      border: '1px solid var(--sky-700)',
    }
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'not-allowed',
    backgroundColor: 'var(--neutral-50)',
    border: '1px solid var(--neutral-400)',
  },
  ...radioFieldSizes
})

export const radioDotStyle = style({
  borderRadius: '99px',
  pointerEvents: 'none'
})

export const radioDotVariants = styleVariants({
  unchecked: {
    opacity: '0'
  },
  checked: {
    opacity: '1',
    backgroundColor: 'var(--sky-600)'
  },
  disabled: {
    backgroundColor: 'var(--neutral-400)'
  },
  ...radioDotSizes
})

export const radioTextContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

export const radioLabelStyle = style({
  fontWeight: '400'
})

export const radioLabelVariants = styleVariants({
  unchecked: {
    color: 'var(--neutral-600)'
  },
  checked: {
    color: 'var(--neutral-700)'
  },
  disabled: {
    color: 'var(--neutral-400)'
  },
  small: {
    fontSize: 'var(--font-sm)'
  },
  medium: {
    fontSize: 'var(--font-md)'
  },
  large: {
    fontSize: 'var(--font-lg)'
  }
})

export const radioCaptionStyle = style({
  fontWeight: '400'
})

export const radioCaptionVariants = styleVariants({
  unchecked: {
    color: 'var(--neutral-600)'
  },
  checked: {
    color: 'var(--neutral-700)'
  },
  disabled: {
    color: 'var(--neutral-400)'
  },
  small: {
    fontSize: 'var(--font-xs)'
  },
  medium: {
    fontSize: 'var(--font-sm)'
  },
  large: {
    fontSize: 'var(--font-md)'
  }
})

export const radioInputAreaStyle = style({
  width: '100%',
  height: '100%',
  margin: 'unset',
  inset: '0',
  opacity: '0',
  position: 'absolute',
  cursor: 'pointer'
})