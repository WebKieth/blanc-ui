import { style, styleVariants } from "@vanilla-extract/css";

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	border: 0,
	borderRadius: '6px',
	padding: '6px 10px',
	cursor: 'pointer',
	backgroundColor: 'var(--zinc-100)',
	selectors: {
		'&:not(:disabled):hover': {
			backgroundColor: 'var(--zinc-200)',
		},
		'&:not(:disabled):active': {
			backgroundColor: 'var(--zinc-300)',
		}
	}
})

export const buttonVariants = styleVariants({
	disabled: {
		cursor: 'not-allowed',
	},
	active: {
		backgroundColor: 'var(--zinc-300)',
	},
	inGroup: {
		alignSelf: 'center'
	},
	first: {
		borderTopLeftRadius: '6px',
		borderBottomLeftRadius: '6px',
		borderRight: '1px solid var(--blue-200)',
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0
	},
	last: {
		borderTopRightRadius: '6px',
		borderBottomRightRadius: '6px',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0
	},
	middle: {
		borderRight: '1px solid var(--blue-200)',
		borderRadius: 0
	},
})
