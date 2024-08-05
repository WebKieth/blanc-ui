import { style, styleVariants } from "@vanilla-extract/css";

export const inputStyle = style({
	display: 'inline-flex',
	position: 'relative',
	gap: '8px',
})

export const inputVariants = styleVariants({
	disabled: {
		cursor: 'not-allowed'
	},
	hover: {},
	focus: {},
	small: {
		padding: '0px 8px',
		height: '28px'
	},
	medium: {
		padding: '0px 12px',
		height: '34px'
	},
	large: {
		padding: '0px 16px',
		height: '40px'
	}
})

export const inputLabelStyle = style({
	color: 'var(--neutral-700)',
	position: 'absolute',
	left: '0',
	top: '0',
	bottom: '0',
	display: 'flex',
	alignItems: 'center',
	zIndex: '-1'
})

export const inputLabelVariants = styleVariants({
	disabled: {
		color: 'var(--neutral-400) !important'
	},
	hover: {
		color: 'var(--neutral-800)'
	},
	focus: {
		color: 'var(--neutral-900)',
		alignItems: 'flex-start',
		transform: 'scale(0.8) translateY(-40%)'
	},
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
	}
})

export const inputFieldBoxStyle = style({
	width: '100%',
	display: 'flex',
	gap: '8px',
	borderBottom: '1px solid var(--zinc-600)'
})

export const inputFieldBoxVariants = styleVariants({
	disabled: {
		borderBottom: '1px solid var(--zinc-400)',
	},
	hover: {
		borderBottom: '1px solid var(--zinc-700)',
	},
	focus: {
		borderBottom: '1px solid var(--zinc-800)'
	},
	small: {},
	medium: {},
	large: {}
})

export const inputFieldStyle = style({
	width: '100%',
	backgroundColor: 'transparent',
	border: '0',
	outline: 'none',
})

export const inputFieldVariants = styleVariants({
	disabled: {
		color: 'var(--neutral-400)',
		pointerEvents: 'none'
	},
	hover: {},
	focus: {},
	small: {
		fontSize: 'var(--font-sm)'
	},
	medium: {
		fontSize: 'var(--font-md)'
	},
	large: {
		fontSize: 'var(--font-lg)'
	}
})