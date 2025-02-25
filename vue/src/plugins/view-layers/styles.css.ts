import { styleVariants } from "@vanilla-extract/css";

export const layerRootVariants = styleVariants({
  contented: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 'var(--zi-layers-root)'
  }
})
