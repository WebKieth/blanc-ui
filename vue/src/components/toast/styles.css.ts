import { style, styleVariants } from "@vanilla-extract/css";

export const toastStyle = style({
    position: 'relative',
    maxWidth: '280px',
    backgroundColor: 'var(--neutral-200)',
    display: 'inline-flex',
})

export const toastBoxStyle = style({
    display: 'flex',
})

export const toastVariants = styleVariants({
    small: {
        padding: '6px 12px',
        boxShadow: '0px 0px 16px -2px var(--dark-16)',
    },
    medium: {
        padding: '8px 16px',
        boxShadow: 'var(--shadow-dark-md)',
    },
    large: {
        padding: '12px 20px',
        boxShadow: 'var(--shadow-dark-md)',
    }
})

export const toastBoxVariants = styleVariants({
    small: {
        gap: '6px'
    },
    medium: {
        gap: '8px'
    },
    large: {
        gap: '12px'
    }
})

export const toastContentStyle = style({
    display: 'flex',
    flexDirection: 'column',
})

export const toastContentVariants = styleVariants({
    small: {
        gap: '6px'
    },
    medium: {
        gap: '8px'
    },
    large: {
        gap: '12px'
    }
})

export const toastIconStyle = style({
    paddingTop: '8px',
})

export const toastIconVariants = styleVariants({
    small: {
        paddingTop: '2px'
    },
    medium: {
        paddingTop: '4px'
    },
    large: {
        paddingTop: '8px'
    }
})

export const toastHeaderStyle = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

export const toastHeaderVariants = styleVariants({
    small: {
        gap: '6px'
    },
    medium: {
        gap: '8px'
    },
    large: {
        gap: '12px'
    }
})

export const toastCloseStyle = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

export const toastCloseVariants = styleVariants({
    small: {
        width: '20px',
        height: '20px'
    },
    medium: {
        width: '26px',
        height: '26px'
    },
    large: {
        width: '32px',
        height: '32px'
    }
})

export const toastTitleStyle = style({
    fontWeight: 'bold',
})

export const toastTitleVariants = styleVariants({
    small: {
        fontSize: 'var(--font-lg)'
    },
    medium: {
        fontSize: 'var(--font-xl)'
    },
    large: {
        fontSize: 'var(--font-xxl)'
    }
})

export const toastMessageStyle = style({
    fontWeight: 'normal',
    lineHeight: '1.5',
})

export const toastMessageVariants = styleVariants({
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