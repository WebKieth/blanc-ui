import { style, styleVariants } from "@vanilla-extract/css";

export const dropdownRootStyle = style({
	position: 'relative'
})

export const dropdownAgentStyle = style({
	width: 'fit-content',
	cursor: 'pointer'
})

export const dropdownBodyStyle = style({
	position: 'absolute',
	zIndex: '3',
	width: 'fit-content',
	backgroundColor: 'var(--white)',
	border: '1px solid var(--zinc-300)',
	boxShadow: '2px 2px 4px 2px rgba(24, 24, 24, 0.2)',
	opacity: 0,
  pointerEvents: 'none',
})

export const dropdownBodyVariants = styleVariants({
	opened: {
		opacity: '1',
		pointerEvents: 'auto',
	},
	small: {
		padding: '4px'
	},
	medium: {
		padding: '12px 16px'
	},
	large: {
		padding: '14px 18px'
	},
	left: {
		marginTop: 0
	},
	right: {
		marginTop: 0
	},
	top: {
		marginTop: 0,
		marginBottom: 'calc(100% + 1rem)'
	},
	bottom: {
		marginTop: 0,
		marginBottom: 'calc(100% + 1rem)'
	},
	'left-top': {},
	'left-bottom': {},
	'right-top': {},
	'right-bottom': {},
	'top-left': {},
	'top-right': {},
	'bottom-left': {},
	'bottom-right': {}
})