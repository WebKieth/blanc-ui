import { style, styleVariants } from "@vanilla-extract/css";

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	border: 0,
	borderRadius: '6px'
})

export const buttonVariants = styleVariants({
	brand: {
		backgroundColor: 'var(--blue-500)',
		color: 'var(--neutral-50)',
		':hover': {
			backgroundColor: 'var(--blue-600)'
		},
		':active': {
			backgroundColor: 'var(--blue-700)'
		},
	},
	info: {
		backgroundColor: 'var(--neutral-300)',
		color: 'var(--slate-950)',
		':hover': {
			backgroundColor: 'var(--neutral-400)'
		},
		':active': {
			backgroundColor: 'var(--neutral-500)'
		}
	},
	warning: {
		backgroundColor: 'var(--white)',
		border: '1px solid var(--zinc-300)',
		color: 'var(--slate-950)',
		':hover': {
			border: '1px solid var(--zinc-400)'
		},
		':active': {
			border: '1px solid var(--zinc-500)',
			backgroundColor: 'var(--neutral-100)'
		}
	},
	success: {
		backgroundColor: 'var(--white)',
		color: 'var(--slate-950)',
		':hover': {
			backgroundColor: 'var(--zinc-100)'
		},
		':active': {
			backgroundColor: 'var(--zinc-200)'
		}
	},
	rounded: {},
	danger: {},
	small: {
		height: '28px',
		padding: '0 8px',
		fontSize: 'var(--font-sm)'
	},
	medium: {
		height: '34px',
		padding: '0 12px',
		fontSize: 'var(--font-md)'
	},
	large: {
		height: '40px',
		padding: '0 16px',
		fontSize: 'var(--font-lg)'
	},
	disabled: {
		cursor: 'not-allowed',
	},
	brand_disabled: {
		backgroundColor: 'var(--gray-200)',
		color: 'var(--gray-500)'
	},
	info_disabled: {
		backgroundColor: 'var(--gray-100)',
		color: 'var(--gray-400)'
	},
	warning_disabled: {
		backgroundColor: 'var(--white)',
		border: '1px solid var(--zinc-100)',
		color: 'var(--gray-400)'
	},
	success_disabled: {
		backgroundColor: 'var(--white)',
		color: 'var(--gray-400)'
	},
	rounded_disabled: {},
	danger_disabled: {},
	active: {},
	brand_active: {
		backgroundColor: 'var(--blue-700)',
		color: 'var(--neutral-100)',
		':hover': {
			backgroundColor: 'var(--blue-700)',
			color: 'var(--neutral-100)',
		},
		':active': {
			backgroundColor: 'var(--blue-700)',
			color: 'var(--neutral-100)',
		}
	},
	info_active: {
		backgroundColor: 'var(--neutral-600)',
		color: 'var(--slate-50)',
		':hover': {
			backgroundColor: 'var(--neutral-600)',
			color: 'var(--slate-50)',
		},
		':active': {
			backgroundColor: 'var(--neutral-600)',
			color: 'var(--slate-50)',
		}
	},
	warning_active: {
		backgroundColor: 'var(--zinc-200)',
		border: '1px solid var(--zinc-500)',
		color: 'var(--slate-950)',
		cursor: 'default',
		':hover': {
			backgroundColor: 'var(--zinc-200)',
			border: '1px solid var(--zinc-500)',
			color: 'var(--slate-950)',
		},
		':active': {
			backgroundColor: 'var(--zinc-200)',
			border: '1px solid var(--zinc-500)',
			color: 'var(--slate-950)',
		}
	},
	success_active: {
		backgroundColor: 'var(--slate-100)',
		color: 'var(--slate-950)',
		':hover': {
			backgroundColor: 'var(--slate-100)',
			color: 'var(--slate-950)',
		},
		':active': {
			backgroundColor: 'var(--slate-100)',
			color: 'var(--slate-950)',
		}
	},
	rounded_active: {},
	danger_active: {},
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
	brand_first: {},
	brand_middle: {},
	brand_last: {},
	info_first: {},
	info_middle: {},
	info_last: {},
	warning_first: {},
	warning_middle: {},
	warning_last: {},
	success_first: {},
	success_middle: {},
	success_last: {},
	rounded_first: {},
	danger_first: {},
	rounded_middle: {},
	danger_middle: {},
	rounded_last: {},
	danger_last: {},
})
