import { style, styleVariants } from "@vanilla-extract/css"
import { heightsBySize } from "../../styles.css"

export const tableCellStyle = style({
	display: 'flex',
	alignItems: 'center',
	padding: '0 12px',
	fontSize: '12px'
})

export const tableCellVariants = styleVariants({
	...heightsBySize,
	selected: {
		color: 'white'
	}
})