import { style, styleVariants } from "@vanilla-extract/css";
import { heightsBySize } from "../styles.css";

export const tableHeaderStyle = style({
	width: '100%',
	position: 'relative',
	display: 'flex',
	backgroundColor: 'var(--slate-50)'
})

export const tableHeaderVariants = styleVariants({
	...heightsBySize,
})