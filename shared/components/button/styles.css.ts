import { style, styleVariants } from "@vanilla-extract/css";

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	border: 0,
	borderRadius: '6px'
})

export const buttonVariants = styleVariants({
	primary: {
		backgroundColor: 'var(--blue-500)',
		color: 'var(--neutral-50)',
		':hover': {
			backgroundColor: 'var(--blue-600)'
		},
		':active': {
			backgroundColor: 'var(--blue-700)'
		},
	},
	secondary: {
		backgroundColor: 'var(--neutral-300)',
		color: 'var(--slate-950)',
		':hover': {
			backgroundColor: 'var(--neutral-400)'
		},
		':active': {
			backgroundColor: 'var(--neutral-500)'
		}
	},
	outlined: {
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
	clean: {
		backgroundColor: 'var(--white)',
		color: 'var(--slate-950)',
		':hover': {
			backgroundColor: 'var(--zinc-100)'
		},
		':active': {
			backgroundColor: 'var(--zinc-200)'
		}
	},
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
	primary_disabled: {
		backgroundColor: 'var(--gray-200)',
		color: 'var(--gray-500)'
	},
	secondary_disabled: {
		backgroundColor: 'var(--gray-100)',
		color: 'var(--gray-400)'
	},
	outlined_disabled: {
		backgroundColor: 'var(--white)',
		border: '1px solid var(--zinc-100)',
		color: 'var(--gray-400)'
	},
	clean_disabled: {
		backgroundColor: 'var(--white)',
		color: 'var(--gray-400)'
	},
	active: {},
	primary_active: {
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
	secondary_active: {
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
	outlined_active: {
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
	clean_active: {
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
	primary_first: {},
	primary_middle: {},
	primary_last: {},
	secondary_first: {},
	secondary_middle: {},
	secondary_last: {},
	outlined_first: {},
	outlined_middle: {},
	outlined_last: {},
	clean_first: {},
	clean_middle: {},
	clean_last: {}
})