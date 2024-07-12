import { style } from '@vanilla-extract/css'

export const tableStyle = style({
	display: 'flex',
	flexDirection: 'column'
})

export const heightsBySize = {
	small: {
		height: '32px'
	},
	medium: {
		height: '40px'
	},
	large: {
		height: '48px'
	}
}