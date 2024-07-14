import { style, styleVariants } from "@vanilla-extract/css";

export const tableRowBoxStyle = style({
	display: 'flex',
	flexDirection: 'column',
	borderBottom: '1px solid var(--zinc-200)',
})

export const tableRowBoxVariants = styleVariants({
	selected: {},
	notSelected: {},
	selectable: {}
})

export const tableMainRowStyle = style({
	display: 'flex'
})

export const tableMainRowVariants = styleVariants({
	selectable: {
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'var(--blue-50)'
		}
	},
	selected: {
		backgroundColor: 'var(--blue-700)'
	},
	notSelected: {
		backgroundColor: 'var(--white)'
	}
})

export const tableSubRowStyle = style({
	display: 'flex',
	borderTop: '1px solid var(--zinc-100)',
	padding: '16px 12px',
})

export const tableRowActionsStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px'
})

export const tableRowExpanderStyle = style({
	cursor: 'pointer',
})

export const tableRowExpanderVariants = styleVariants({
	selectable: {},
	notSelected: {
		color: 'var(--zinc-500)',
		':hover': {
			color: 'var(--zinc-700)'
		}
	},
	selected: {
		color: 'var(--zinc-200)',
		':hover': {
			color: 'var(--zinc-50)'
		}
	}
})