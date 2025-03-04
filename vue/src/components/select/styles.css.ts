import { style, styleVariants } from "@vanilla-extract/css";
import { dropdownBodyStyle } from "../dropdown";

export const selectStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  justifyContent: 'space-between',
  minWidth: '160px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px var(--zinc-400)',
})

export const selectVariants = styleVariants({
  small: {
    height: '28px',
    padding: '0px 6px'
  },
  medium: {
    height: '34px',
    padding: '0px 8px'
  },
  large: {
    height: '40px',
    padding: '0px 10px'
  },
  opened: {},
  filled: {}
})

export const selectBodyStyle = style({
  flexGrow: '1',
  display: 'flex',
  position: 'relative',
  height: '100%',
  alignItems: 'center'
})

export const selectValueStyle = style({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '120px',
})

export const selectValueVariants = styleVariants({
  small: {},
  medium: {},
  large: {},
  opened: {}
})

export const selectPlaceholderStyle = style({
  color: 'var(--gray-400)',
  pointerEvents: 'none',
  position: 'absolute'
})

export const selectPlaceholderVariants = styleVariants({
  small: {},
  medium: {},
  large: {},
  opened: {},
  filled: {
    display: 'none'
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
    padding: '1px 3px'
  },
  medium: {
    padding: '3px 6px'
  },
  large: {
    padding: '4px 8px'
  },
  selected: {
    backgroundColor: 'var(--zinc-100)'
  }
})