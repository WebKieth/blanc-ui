import { DefineComponent, Ref } from "vue"

export type IconComponents = Record<string, DefineComponent>
export type IconifyOptions = {
  spriteUrl?: string
  components?: IconComponents
}
export type IconifyProvided = {
  sprite: Ref<Document | null>
}
