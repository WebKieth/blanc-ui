import { style } from '@vanilla-extract/css'

export const modalBackdropStyle = style({
	position: 'fixed',
	zIndex: 999,
	inset: 0,
	height: '100%',
	width: '100%',
	backgroundColor: 'rgba(0,0,0,0.5)',
})

export const modalWindowStyle = style({
	position: 'absolute',
	zIndex: 1000,
	inset: 0,
	margin: 'auto',
	backgroundColor: 'white',
	height: 'fit-content',
	width: 'fit-content',
	overflow: 'hidden'
})