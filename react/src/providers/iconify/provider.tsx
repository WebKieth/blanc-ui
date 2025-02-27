import { createContext, FC, PropsWithChildren, useEffect, useState } from "react"
import { IconifyProvided, IconifyProviderProps } from "./types"

export const IconifyContext = createContext<IconifyProvided>({
  components: {},
  sprite: undefined
})

export const IconifyProvider: FC<PropsWithChildren<IconifyProviderProps>> = ({
  children,
  components = {},
  spriteUrl = 'https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.symbol.svg'
}) => {
  const [sprite, setSprite] = useState<Document>()

  useEffect(() => {
    if (!spriteUrl) return
    fetch(spriteUrl)
      .then((resp) => resp.text())
      .then((string) => {
        const xml = new DOMParser().parseFromString(string, 'image/svg+xml')
        setSprite(xml)
      })
  }, [spriteUrl])

  return <IconifyContext.Provider value={{
    components: components,
    sprite
  }}>
    {children}
  </IconifyContext.Provider>
}