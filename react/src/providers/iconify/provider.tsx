import { createContext, FC, PropsWithChildren, useEffect, useState } from "react"
import { IconifyProvided, IconifyProviderProps } from "./types"

export const IconifyContext = createContext<IconifyProvided>({
  components: {},
  sprite: undefined
})

export const IconifyProvider: FC<PropsWithChildren<IconifyProviderProps>> = ({children, ...options}) => {
  const [sprite, setSprite] = useState<Document>()

  useEffect(() => {
    if (!options.spriteUrl) return
    fetch(options.spriteUrl)
      .then((resp) => resp.text())
      .then((string) => {
        const xml = new DOMParser().parseFromString(string, 'image/svg+xml')
        setSprite(xml)
      })
  }, [options.spriteUrl])

  return <IconifyContext.Provider value={{
    components: options.components,
    sprite
  }}>
    {children}
  </IconifyContext.Provider>
}