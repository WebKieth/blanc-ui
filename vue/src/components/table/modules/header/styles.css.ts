import { style, styleVariants } from "@vanilla-extract/css";
import { heightsBySize } from "../../styles.css";

export const tableHeaderStyle = style({
	textAlign: 'left',
	width: '100%',
	position: 'relative',
	display: 'flex',
})

export const tableHeaderVariants = styleVariants({
	...heightsBySize,
})