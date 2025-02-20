import { App, ref } from "vue"
import { IconifyOptions, IconifyProvided } from "./types"


export const $iconify = Symbol('iconify')
export const $icons = Symbol('icons')

export const installIcons = (app: App,options: IconifyOptions): IconifyProvided => {
  const sprite = ref<Document | null>(null)
  const { components, spriteUrl } = options
  if (components && Object.keys(components).length) {
    app.provide($icons, components)
  }
  if (spriteUrl) {
    fetch(spriteUrl)
      .then((resp) => resp.text())
      .then((xml) => {
        sprite.value = new DOMParser().parseFromString(xml, 'image/svg+xml')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return { sprite }
}