import { style, styleVariants } from "@vanilla-extract/css";

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	border: 0,
})

export const buttonVariants = styleVariants({
	primary: {
		backgroundColor: 'var(--blue-700)',
		color: 'var(--neutral-50)',
		':hover': {
			backgroundColor: 'var(--blue-800)'
		},
		':active': {
			backgroundColor: 'var(--blue-900)'
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
	disabled_primary: {
		backgroundColor: 'var(--gray-200)',
		color: 'var(--gray-500)'
	},
	disabled_secondary: {
		backgroundColor: 'var(--gray-100)',
		color: 'var(--gray-400)'
	},
	disabled_outlined: {
		backgroundColor: 'var(--white)',
		border: '1px solid var(--zinc-100)',
		color: 'var(--gray-400)'
	},
	disabled_clean: {
		backgroundColor: 'var(--white)',
		color: 'var(--gray-400)'
	}
})