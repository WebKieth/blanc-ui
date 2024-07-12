import { style, styleVariants } from "@vanilla-extract/css"

const boxSizes = {
	small: {
		width: '16px',
		height: '16px',
	},
	medium: {
		width: '20px',
		height: '20px',
	},
	large: {
		width: '24px',
		height: '24px',
	}
}

export const checkboxStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px'
})

export const checkboxFieldStyle = style({
	position: 'relative'
})

export const checkboxFieldVariants = styleVariants({
	unchecked: {
		border: '1px solid var(--teal-600)',
		backgroundColor: 'var(--teal-50)',
		':hover': {
			border: '1px solid var(--teal-700)',
			backgroundColor: 'var(--teal-100)',
		}
	},
	checked: {
		backgroundColor: 'var(--sky-600)',
		border: '1px solid var(--sky-600)',
		':hover': {
			backgroundColor: 'var(--sky-700)',
			border: '1px solid var(--sky-700)',
		}
	},
	disabled: {
		pointerEvents: 'none',
		cursor: 'not-allowed'
	},
	...boxSizes
})
export const checkboxIconStyle = style({
	position: 'absolute',
	inset: '0',
	margin: 'auto',
	pointerEvents: 'none',
})
export const checkboxIconVariants = styleVariants({
	unchecked: {
		opacity: '0'
	},
	checked: {
		opacity: '1',
		color: 'white'
	},
	disabled: {
		color: 'var(--neutral-400)'
	},
	...boxSizes
})

export const checkboxTextContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px'
})

export const checkboxLabelStyle = style({
	fontWeight: '400'
})

export const checkboxLabelVariants = styleVariants({
	unchecked: {
		color: 'var(--neutral-600)'
	},
	checked: {
		color: 'var(--neutral-700)'
	},
	disabled: {
		color: 'var(--neutral-400)'
	},
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

export const checkboxCaptionStyle = style({
	fontWeight: '400'
})

export const checkboxCaptionVariants = styleVariants({
	unchecked: {
		color: 'var(--neutral-600)'
	},
	checked: {
		color: 'var(--neutral-700)'
	},
	disabled: {
		color: 'var(--neutral-400)'
	},
	small: {
		fontSize: 'var(--font-xs)'
	},
	medium: {
		fontSize: 'var(--font-sm)'
	},
	large: {
		fontSize: 'var(--font-md)'
	}
})

export const checkboxInputAreaStyle = style({
	width: '100%',
	height: '100%',
	margin: 'unset',
	inset: '0',
	opacity: '0',
	position: 'absolute',
	cursor: 'pointer'
})