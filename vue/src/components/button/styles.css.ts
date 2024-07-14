import { style, styleVariants } from "@vanilla-extract/css";

export const buttonStyle = style({
	display: 'flex',
	alignItems: 'center',
	border: 0,
})

export const buttonVariants = styleVariants({
	primary: {
		backgroundColor: 'var(--blue-700)',
		color: 'var(--white)',
		':hover': {
			backgroundColor: 'var(--blue-800)'
		},
		':focus': {
			backgroundColor: 'var(--blue-900)'
		},
	},
	secondary: {
		backgroundColor: 'var(--neutral-300)',
		':hover': {
			backgroundColor: 'var(--neutral-400)'
		}
	},
	outlined: {
		backgroundColor: 'var(--white)',
		border: '1px solid var(--zinc-300)',
		':hover': {
			border: '1px solid var(--zinc-400)'
		}
	},
	clean: {
		backgroundColor: 'var(--white)',
		':hover': {
			backgroundColor: 'var(--zinc-100)'
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
	}
})