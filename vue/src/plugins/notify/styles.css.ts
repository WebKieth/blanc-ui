import { style, styleVariants } from "@vanilla-extract/css"

export const notificatorStyles = style({
    position: 'fixed',
    margin: 'auto',
    width: 'fit-content',
    maxWidth: '28vw',
    zIndex: 'var(--zi-notification)',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.75rem'
})

const baseOffset = '88px'

const xCenteredProps = {
    left: '50%',
    transform: 'translate(-50%)',
    justifyContent: 'center'
}

const topProps = {
    top: baseOffset
}

const bottomProps = {
    bottom: baseOffset
}

const leftProps = {
    left: baseOffset,
    justifyContent: 'flex-start'
}

const rightProps = {
    right: baseOffset,
    justifyContent: 'flex-end'
}

export const notificatorVariants = styleVariants({
    top: {...topProps, ...xCenteredProps},
    topLeft: {...topProps, ...leftProps},
    topRight: {...topProps, ...rightProps},
    bottom: {...bottomProps, ...xCenteredProps},
    bottomLeft: {...bottomProps, ...leftProps},
    bottomRight: {...bottomProps, ...rightProps}
})