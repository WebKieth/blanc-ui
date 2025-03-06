import { style, styleVariants } from "@vanilla-extract/css";
import { dropdownBodyStyle } from "../dropdown";

export const selectStyle = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '8px'
})

export const selectVariants = styleVariants({
  small: {},
  medium: {},
  large: {},
  filled: {},
  opened: {},
  disabled: {
    cursor: 'not-allowed'
  }
})

export const selectLabelStyle = style({
  color: 'var(--neutral-700)'
})

export const selectLabelVariants = styleVariants({
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
  },
  disabled: {
    color: 'var(--neutral-400)'
  },
  filled: {},
  opened: {}
})

export const selectFieldStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  justifyContent: 'space-between',
  minWidth: '160px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px var(--zinc-400)',
})

export const selectFieldVariants = styleVariants({
  small: {
    height: '28px',
    minWidth: '150px',
    padding: '0px 6px'
  },
  medium: {
    height: '34px',
    minWidth: '180px',
    padding: '0px 8px'
  },
  large: {
    height: '40px',
    minWidth: '200px',
    padding: '0px 10px'
  },
  disabled: {
    backgroundColor: 'var(--zinc-50)',
    color: 'var(--neutral-400)',
    boxShadow: 'none'
  },
  opened: {},
  filled: {}
})

export const selectFieldBodyStyle = style({
  flexGrow: '1',
  display: 'flex',
  position: 'relative',
  height: '100%',
  alignItems: 'center'
})

export const selectFieldValueStyle = style({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '120px',
})

export const selectFieldValueVariants = styleVariants({
  small: {
    fontSize: 'var(--font-sm)'
  },
  medium: {
    fontSize: 'var(--font-md)'
  },
  large: {
    fontSize: 'var(--font-lg)'
  },
  opened: {},
  disabled: {
    color: 'var(--neutral-600)'
  }
})

export const selectPlaceholderStyle = style({
  color: 'var(--gray-400)',
  pointerEvents: 'none',
  position: 'absolute'
})

export const selectPlaceholderVariants = styleVariants({
  small: {
    fontSize: 'var(--font-sm)'
  },
  medium: {
    fontSize: 'var(--font-md)'
  },
  large: {
    fontSize: 'var(--font-lg)'
  },
  opened: {},
  filled: {
    display: 'none'
  },
  disabled: {
    color: 'var(--gray-300)',
  }
})

export const selectDropdownStyle = style([
  dropdownBodyStyle,
  {
    boxShadow: '0 2px 5px var(--zinc-400)',
    padding: 0,
    maxHeight: '150px',
    overflow: 'auto'
  }
])

export const selectOptionStyle = style({
  cursor: 'pointer'
})

export const selectOptionVariants = styleVariants({
  small: {
    padding: '1px 3px',
    fontSize: 'var(--font-sm)'
  },
  medium: {
    padding: '3px 6px',
    fontSize: 'var(--font-md)'
  },
  large: {
    padding: '4px 8px',
    fontSize: 'var(--font-lg)'
  },
  selected: {
    backgroundColor: 'var(--zinc-100)'
  }
})