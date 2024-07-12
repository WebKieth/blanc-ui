import { style, styleVariants } from "@vanilla-extract/css";

export const tableHeaderCellStyle = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	padding: '0 12px',
	borderTop: '1px solid var(--zinc-100)',
	borderBottom: '1px solid var(--zinc-100)'
})

export const tableHeaderCellVariants = styleVariants({
	sortable: {
		cursor: 'pointer'
	}
})

export const tableHeaderCellLabelStyle = style({
	display: 'flex',
	alignItems: 'center',
	fontSize: 'var(--font-md)',
	fontWeight: 'bold',
})

export const tableHeaderCellIconStyle = style({
	opacity: 1,
	width: '1rem',
	height: '1rem',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	':before': {
		content: '',
		width: 0,
		height: 0,
		borderLeft: '3px solid transparent',
		borderRight: '3px solid transparent',
		borderTop: '3px solid var(--zinc-700)',
	}
})

export const tableHeaderCellIconVariants = styleVariants({
	invisible: {
		opacity: 0
	},
	asc: {},
	desc: {
		':before': {
			transform: 'rotateX(180deg)'
		}
	}
})