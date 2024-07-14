import { style, styleVariants } from "@vanilla-extract/css"
import { heightsBySize } from "../../styles.css"

export const tableCellStyle = style({
	display: 'flex',
	alignItems: 'center',
	padding: '0 12px',
	fontSize: '12px',
	borderRight: '1px solid var(--zinc-200)',
	':last-of-type': {
		borderRight: '0'
	}
})

export const tableCellVariants = styleVariants({
	...heightsBySize,
	selected: {
		color: 'white'
	}
})